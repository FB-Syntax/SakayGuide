const axios = require('axios');

const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 500;
const USER_AGENT = 'GasWatch-API/1.0';

const resources = Object.freeze({
  dataJS: {
    label: 'GasWatchPH data.js',
    url: 'https://gaswatchph.com/js/data.js',
  },
  stationOverrides: {
    label: 'GasWatchPH station overrides',
    url: 'https://gaswatchph.com/js/station-overrides.js',
  },
  communityPrices: {
    label: 'GasWatchPH community prices',
    url: 'https://gaswatchph.com/api/community-prices',
  },
});

class DownloadError extends Error {
  constructor(resourceLabel, attempts, cause) {
    super(
      `Unable to download ${resourceLabel} after ${attempts} attempt${attempts === 1 ? '' : 's'}: ${describeError(cause)}`,
      { cause }
    );

    this.name = 'DownloadError';
    this.resource = resourceLabel;
    this.attempts = attempts;
  }
}

function describeError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `received HTTP ${error.response.status}`;
    }

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return `request timed out after ${REQUEST_TIMEOUT_MS}ms`;
    }
  }

  return error.message || 'an unknown error occurred';
}

function shouldRetry(error) {
  if (!axios.isAxiosError(error) || !error.response) {
    return true;
  }

  const { status } = error.response;
  return status === 408 || status === 425 || status === 429 || status >= 500;
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function downloadResource(resource) {
  let lastError;

  for (let retry = 0; retry <= MAX_RETRIES; retry += 1) {
    try {
      const response = await axios.get(resource.url, {
        timeout: REQUEST_TIMEOUT_MS,
        headers: {
          'User-Agent': USER_AGENT,
        },
      });

      return response.data;
    } catch (error) {
      lastError = error;

      if (retry === MAX_RETRIES || !shouldRetry(error)) {
        throw new DownloadError(resource.label, retry + 1, error);
      }

      await wait(INITIAL_BACKOFF_MS * 2 ** retry);
    }
  }

  throw new DownloadError(resource.label, MAX_RETRIES + 1, lastError);
}

async function downloadDataJS() {
  return downloadResource(resources.dataJS);
}

async function downloadStationOverrides() {
  return downloadResource(resources.stationOverrides);
}

async function downloadCommunityPrices() {
  return downloadResource(resources.communityPrices);
}

async function downloadAll() {
  const [dataJS, stationOverrides, communityPrices] = await Promise.all([
    downloadDataJS(),
    downloadStationOverrides(),
    downloadCommunityPrices(),
  ]);

  return {
    dataJS,
    stationOverrides,
    communityPrices,
  };
}

module.exports = {
  downloadDataJS,
  downloadStationOverrides,
  downloadCommunityPrices,
  downloadAll,
};
