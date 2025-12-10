# Lagos Transit Navigator - Backend API

Backend API for the Lagos Transit Navigator web application. Built with Node.js, Express, and TypeScript.

## Features

- 🚌 Route calculation between Lagos bus stops
- 🔍 Fuzzy search for bus stops with autocomplete
- 🚦 Real-time traffic data (Google Maps API or mock data)
- 🛡️ Rate limiting and security headers
- 📊 Comprehensive Lagos bus routes database
- 🌐 CORS enabled for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **APIs**: Google Maps API (optional)
- **Security**: Helmet, CORS, Rate Limiting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your Google Maps API key (optional)
```

3. Start development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Calculate Route
```
POST /api/route
Content-Type: application/json

{
  "origin": "Ikeja",
  "destination": "Lekki",
  "preferences": {
    "fastest": true
  }
}
```

### Search Bus Stops
```
GET /api/bus-stops?q=ikeja
```

### Get All Bus Stops
```
GET /api/bus-stops/all
```

### Get Traffic Data
```
GET /api/traffic?from=Ikeja&to=Lekki
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | (optional) |
| `USE_FREE_SERVICES` | Use mock data instead of Google Maps | `true` |

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── data/            # JSON datasets
│   ├── types/           # TypeScript types
│   └── server.ts        # Express app
├── package.json
└── tsconfig.json
```

## Google Maps API Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Directions API
   - Distance Matrix API
   - Places API
4. Create API key
5. Add key to `.env` file
6. Set `USE_FREE_SERVICES=false`

**Note**: Google Maps has a free tier with $200 monthly credit.

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Run production build
npm start
```

## License

MIT
