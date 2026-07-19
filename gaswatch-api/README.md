# GasWatch API

GasWatch API downloads, parses, merges, and serves GasWatchPH fuel-price data through a production-focused Node.js REST API.

## Requirements

- Node.js 20 or later
- npm

## Installation

```bash
npm install
```

Copy `.env.example` to `.env` and update configuration values as needed.

## Run

```bash
npm start
```

For local development with automatic restart:

```bash
npm run dev
```

The server loads the first dataset before accepting requests. It refreshes data every five minutes after startup.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port for the API. |
| `NODE_ENV` | `development` | Runtime mode: `development`, `test`, or `production`. |
| `CORS_ORIGIN` | `*` | Comma-separated browser-origin allowlist, or `*`. |
| `JSON_BODY_LIMIT` | `1mb` | Maximum JSON or URL-encoded request body size. |
| `SHUTDOWN_TIMEOUT_MS` | `10000` | Graceful-shutdown timeout in milliseconds. |

## Documentation

Interactive Swagger documentation is available at `GET /docs`.

## Available endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/health` | Process health check. |
| GET | `/api/health` | Health-check alias. |
| GET | `/api/stations` | Paginated, filterable station list. |
| GET | `/api/stations/:id` | Single merged station. |
| GET | `/api/search` | Search station name, brand, or area. |
| GET | `/api/brands` | Brands with dynamic station counts. |
| GET | `/api/areas` | Unique areas in alphabetical order. |
| GET | `/api/history` | Fuel price history. |
| GET | `/api/advisories` | Current advisories. |
| GET | `/api/statistics` | Dataset and cache statistics. |
| POST | `/api/reload` | Refresh data immediately. |

## Example requests

```bash
curl http://localhost:3000/api/stations?page=1&limit=50&brand=shell&fuel=diesel
curl http://localhost:3000/api/stations/1
curl "http://localhost:3000/api/search?q=shell"
curl http://localhost:3000/api/brands
curl http://localhost:3000/api/statistics
curl -X POST http://localhost:3000/api/reload
```

## Runtime behavior

- Responses are compressed when the client supports compression.
- Requests are limited to 100 per minute per IP address.
- Request logs include method, URL, status code, and response time.
- Errors use consistent JSON responses and include an `X-Request-Id` header.
