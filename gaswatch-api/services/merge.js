function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertRecord(value, name) {
  if (!isRecord(value)) {
    throw new TypeError(`${name} must be an object.`);
  }
}

function isValidPrice(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function applyStationOverrides(stationById, stationOverrides) {
  for (const [stationId, fuelOverrides] of Object.entries(stationOverrides)) {
    const station = stationById.get(String(stationId));

    if (!station || !isRecord(station.prices) || !isRecord(fuelOverrides)) {
      continue;
    }

    for (const [fuelType, override] of Object.entries(fuelOverrides)) {
      if (
        Object.hasOwn(station.prices, fuelType) &&
        isRecord(override) &&
        isValidPrice(override.p)
      ) {
        station.prices[fuelType] = override.p;
      }
    }
  }
}

function applyCommunityPrices(stationById, communityPrices) {
  for (const [stationId, fuelReports] of Object.entries(communityPrices)) {
    const station = stationById.get(String(stationId));

    if (!station || !isRecord(station.prices) || !isRecord(fuelReports)) {
      continue;
    }

    for (const [fuelType, report] of Object.entries(fuelReports)) {
      if (
        !Object.hasOwn(station.prices, fuelType) ||
        !isRecord(report) ||
        !isValidPrice(report.price)
      ) {
        continue;
      }

      station.prices[fuelType] = report.price;
      station.community ??= {};
      station.community[fuelType] = {
        price: report.price,
        timestamp: report.timestamp,
        count: report.count,
      };
    }
  }
}

function mergeData(GAS_STATIONS, STATION_OVERRIDES, communityPrices) {
  if (!Array.isArray(GAS_STATIONS)) {
    throw new TypeError('GAS_STATIONS must be an array.');
  }

  assertRecord(STATION_OVERRIDES, 'STATION_OVERRIDES');
  assertRecord(communityPrices, 'communityPrices');
  assertRecord(communityPrices.communityPrices, 'communityPrices.communityPrices');

  const mergedStations = structuredClone(GAS_STATIONS);
  const stationById = new Map(
    mergedStations
      .filter((station) => isRecord(station) && station.id !== undefined && station.id !== null)
      .map((station) => [String(station.id), station])
  );

  applyStationOverrides(stationById, STATION_OVERRIDES);
  applyCommunityPrices(stationById, communityPrices.communityPrices);

  return mergedStations;
}

module.exports = {
  mergeData,
};
