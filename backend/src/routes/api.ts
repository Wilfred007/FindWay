import { Router } from 'express';
import { postRoute } from '../controllers/routeController';
import { getBusStops, getAllBusStopsController } from '../controllers/busStopController';
import { getTraffic } from '../controllers/trafficController';

const router = Router();

// Health check
router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Lagos Transit Navigator API is running',
        timestamp: new Date().toISOString(),
    });
});

// Route calculation
router.post('/route', postRoute);

// Bus stops
router.get('/bus-stops', getBusStops);
router.get('/bus-stops/all', getAllBusStopsController);

// Traffic
router.get('/traffic', getTraffic);

export default router;
