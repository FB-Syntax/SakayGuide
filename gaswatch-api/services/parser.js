const vm = require('node:vm');

const VM_TIMEOUT_MS = 5_000;
const RESULT_KEY = '__gaswatchParsedData__';

const dataJSGlobals = Object.freeze([
  'GAS_STATIONS',
  'BRANDS',
  'PRICE_HISTORY',
  'ADVISORIES',
  'FUEL_TYPES',
]);

const stationOverrideGlobals = Object.freeze(['STATION_OVERRIDES']);

class ParseError extends Error {
  constructor(resourceName, message, cause) {
    super(`Failed to parse ${resourceName}: ${message}`, cause ? { cause } : undefined);

    this.name = 'ParseError';
    this.resource = resourceName;
  }
}

function createContext(resourceName) {
  return vm.createContext(Object.create(null), {
    name: `gaswatch-${resourceName}`,
    codeGeneration: {
      strings: false,
      wasm: false,
    },
  });
}

function createExtractionScript(globalNames, resourceName) {
  const properties = globalNames
    .map((name) => `${name}: typeof ${name} === 'undefined' ? undefined : ${name}`)
    .join(', ');

  return new vm.Script(`globalThis.${RESULT_KEY} = { ${properties} };`, {
    filename: `${resourceName}:globals`,
    displayErrors: true,
  });
}

function parseSource(source, resourceName, globalNames) {
  if (typeof source !== 'string' || source.trim() === '') {
    throw new ParseError(resourceName, 'source must be a non-empty JavaScript string.');
  }

  const context = createContext(resourceName);

  try {
    const script = new vm.Script(source, {
      filename: resourceName,
      displayErrors: true,
    });

    script.runInContext(context, { timeout: VM_TIMEOUT_MS });
    createExtractionScript(globalNames, resourceName).runInContext(context, {
      timeout: VM_TIMEOUT_MS,
    });
  } catch (error) {
    const message = error.code === 'ERR_SCRIPT_EXECUTION_TIMEOUT'
      ? `execution exceeded the ${VM_TIMEOUT_MS}ms limit.`
      : error.message;

    throw new ParseError(resourceName, message, error);
  }

  const parsedData = context[RESULT_KEY];
  const missingGlobals = globalNames.filter(
    (name) => !Object.hasOwn(parsedData, name) || parsedData[name] === undefined
  );

  if (missingGlobals.length > 0) {
    throw new ParseError(
      resourceName,
      `missing required global${missingGlobals.length === 1 ? '' : 's'}: ${missingGlobals.join(', ')}.`
    );
  }

  try {
    return structuredClone(parsedData);
  } catch (error) {
    throw new ParseError(resourceName, 'extracted globals are not serializable data.', error);
  }
}

function parseDataJS(source) {
  return parseSource(source, 'GasWatchPH data.js', dataJSGlobals);
}

function parseStationOverrides(source) {
  return parseSource(source, 'GasWatchPH station-overrides.js', stationOverrideGlobals);
}

module.exports = {
  parseDataJS,
  parseStationOverrides,
};
