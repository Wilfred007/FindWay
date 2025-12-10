# 🚌 Lagos Transit Navigator

A full-stack web application that helps users discover exact bus routes, connections, and travel information across Lagos, Nigeria.

![Lagos Transit Navigator](https://img.shields.io/badge/Status-Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Next.js](https://img.shields.io/badge/Next.js-14+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)

## ✨ Features

- **Smart Route Planning**: Find the best bus routes between any two points in Lagos
- **Step-by-Step Directions**: Clear instructions for each leg of your journey
- **Fare Estimates**: Know exactly how much your trip will cost
- **Traffic Updates**: Real-time traffic conditions (Google Maps API or mock data)
- **Multiple Bus Types**: Support for BRT, Danfo, Molue, and Keke
- **Autocomplete Search**: Fuzzy search for bus stops with aliases
- **Mobile-First Design**: Premium, responsive UI that works on all devices

## 🏗️ Architecture

The project consists of two main parts:

### Backend (Node.js + Express)
- RESTful API with TypeScript
- Route calculation engine using breadth-first search
- Google Maps API integration (optional)
- Comprehensive Lagos bus stops and routes database
- Rate limiting and security middleware

### Frontend (Next.js)
- Server-rendered React application
- Modern, Lagos-themed UI design
- Glassmorphism effects and smooth animations
- Client-side routing and state management

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- (Optional) Google Maps API key

### Installation

1. **Clone the repository**
```bash
cd Lagos-App
```

2. **Set up the backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your Google Maps API key (optional)
npm run dev
```

The backend will start on `http://localhost:5000`

3. **Set up the frontend** (in a new terminal)
```bash
cd frontend
npm install
# Create .env.local with: NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm run dev
```

The frontend will start on `http://localhost:3000`

4. **Open your browser**

Navigate to `http://localhost:3000` and start exploring Lagos bus routes!

## 📁 Project Structure

```
Lagos-App/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── data/            # Bus stops & routes data
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── README.md
│
└── frontend/                # Next.js application
    ├── app/                 # Next.js App Router
    ├── components/          # React components
    ├── lib/                 # API client & utilities
    ├── styles/              # Global CSS
    ├── package.json
    └── README.md
```

## 🔌 API Endpoints

### Backend API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/route` | POST | Calculate route between two points |
| `/api/bus-stops` | GET | Search bus stops (autocomplete) |
| `/api/bus-stops/all` | GET | Get all bus stops |
| `/api/traffic` | GET | Get traffic data for a route |

### Example Request

```bash
curl -X POST http://localhost:5000/api/route \
  -H "Content-Type: application/json" \
  -d '{"origin":"Ikeja","destination":"Lekki"}'
```

## 🎨 Design Features

- **Lagos-Themed Colors**: Vibrant blues, greens, and yellows
- **Google Fonts**: Inter (body), Outfit (headings)
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Micro-interactions and transitions
- **Mobile-First**: Responsive design from 320px to 4K

## 🗺️ Data

The application includes:

- **50+ Bus Stops**: Major Lagos locations with coordinates
- **48+ Bus Routes**: BRT, Danfo, and Molue routes
- **Fare Information**: Realistic fare estimates (₦100-₦800)
- **Travel Times**: Based on distance and traffic

## 🔧 Configuration

### Backend Environment Variables

```env
GOOGLE_MAPS_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
USE_FREE_SERVICES=true  # Set to false to use Google Maps API
```

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📝 Development

### Backend

```bash
cd backend
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
```

### Frontend

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Lint code
```

## 🚦 Google Maps API Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Directions API
   - Distance Matrix API
   - Places API (for autocomplete)
4. Create an API key
5. Add to `backend/.env`:
   ```
   GOOGLE_MAPS_API_KEY=your_key_here
   USE_FREE_SERVICES=false
   ```

**Note**: Google Maps has a free tier with $200 monthly credit.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built for Lagosians, by Lagosians
- Inspired by the need for better public transport navigation in Lagos
- Data compiled from public sources and local knowledge

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for Lagos**
# FindWay
