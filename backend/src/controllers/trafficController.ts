import { Request, Response } from 'express';
import { getTrafficData } from '../services/googleMapsService';

/**
 * GET /api/traffic?from=X&to=Y
 * Get traffic data for a route
 */
export async function getTraffic(req: Request, res: Response) {
    try {
        const from = req.query.from as string;
        const to = req.query.to as string;

        if (!from || !to) {
            return res.status(400).json({
                error: 'Missing parameters',
                message: 'Both "from" and "to" query parameters are required',
            });
        }

        const trafficData = await getTrafficData(from, to);

        return res.status(200).json(trafficData);
    } catch (error) {
        console.error('Error in getTraffic:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while fetching traffic data',
        });
    }
}
