const { Router } = require('express');

const { getStations } = require('../services/dataService');
const AppError = require('../utils/AppError');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 5000;
const sortableFields = new Set(['id', 'name', 'brand', 'area']);

const router = Router();

function parsePositiveInteger(value, name, fallback, maximum) {
  if (value === undefined) {
    return fallback;
  }

  if (typeof value !== 'string' || !/^\d+$/.test(value)) {
    throw new AppError(400, `${name} must be a positive integer.`, 'INVALID_QUERY_PARAMETER');
  }

  const number = Number(value);

  if (!Number.isSafeInteger(number) || number <= 0) {
    throw new AppError(400, `${name} must be a positive integer.`, 'INVALID_QUERY_PARAMETER');
  }

  if (maximum && number > maximum) {
    throw new AppError(
      400,
      `${name} must not be greater than ${maximum}.`,
      'INVALID_QUERY_PARAMETER'
    );
  }

  return number;
}

function parsePage(value) {
  return parsePositiveInteger(value, 'page', DEFAULT_PAGE);
}

function parseLimit(value) {
  return parsePositiveInteger(value, 'limit', DEFAULT_LIMIT, MAX_LIMIT);
}

function normalizeFilter(value, name) {
  if (value === undefined) {
    return null;
  }

  if (typeof value !== 'string' || value.trim() === '' || value.length > 100) {
    throw new AppError(
      400,
      `${name} must be a non-empty string no longer than 100 characters.`,
      'INVALID_QUERY_PARAMETER'
    );
  }

  return value.trim().toLocaleLowerCase();
}

function matchesFilters(station, filters) {
  if (
    filters.brand &&
    String(station.brand || '').toLocaleLowerCase() !== filters.brand
  ) {
    return false;
  }

  if (filters.area && String(station.area || '').toLocaleLowerCase() !== filters.area) {
    return false;
  }

  if (filters.city && String(station.city || '').toLocaleLowerCase() !== filters.city) {
    return false;
  }

  if (filters.fuel) {
    const hasFuel = Object.entries(station.prices || {}).some(
      ([fuelType, price]) =>
        fuelType.toLocaleLowerCase() === filters.fuel &&
        typeof price === 'number' &&
        Number.isFinite(price)
    );

    if (!hasFuel) {
      return false;
    }
  }

  return true;
}

function compareStations(left, right, sortField) {
  if (sortField === 'id') {
    return Number(left.id) - Number(right.id);
  }

  const comparison = String(left[sortField] || '').localeCompare(
    String(right[sortField] || ''),
    undefined,
    { sensitivity: 'base' }
  );

  return comparison || Number(left.id) - Number(right.id);
}

router.get('/', (request, response, next) => {
  try {
    const page = parsePage(request.query.page);
    const limit = parseLimit(request.query.limit);
    const requestedSort = typeof request.query.sort === 'string'
      ? request.query.sort.toLocaleLowerCase()
      : 'id';
    const sortField = sortableFields.has(requestedSort) ? requestedSort : 'id';
    const filters = {
      brand: normalizeFilter(request.query.brand, 'brand'),
      area: normalizeFilter(request.query.area, 'area'),
      city: normalizeFilter(request.query.city, 'city'),
      fuel: normalizeFilter(request.query.fuel, 'fuel'),
    };

    const filteredStations = getStations()
      .filter((station) => matchesFilters(station, filters))
      .sort((left, right) => compareStations(left, right, sortField));
    const total = filteredStations.length;
    const pages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;

    return response.status(200).json({
      success: true,
      count: Math.max(0, Math.min(limit, total - offset)),
      page,
      pages,
      total,
      data: filteredStations.slice(offset, offset + limit),
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
