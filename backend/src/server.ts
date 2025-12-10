import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
app.use('/api', rateLimiter);

// API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Lagos Transit Navigator API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            route: 'POST /api/route',
            busStops: 'GET /api/bus-stops?q=query',
            allBusStops: 'GET /api/bus-stops/all',
            traffic: 'GET /api/traffic?from=X&to=Y',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`,
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚌 Lagos Transit Navigator API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 CORS enabled for: ${FRONTEND_URL}`);
    console.log(`🔑 Google Maps API: ${process.env.GOOGLE_MAPS_API_KEY ? 'Configured' : 'Not configured (using mock data)'}`);
    console.log(`✅ Server ready!`);
});

export default app;
