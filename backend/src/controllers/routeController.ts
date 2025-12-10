import { Request, Response } from 'express';
import { calculateRoute } from '../services/routeEngine';
import { RouteRequest } from '../types';

/**
 * POST /api/route
 * Calculate route between origin and destination
 */
export async function postRoute(req: Request, res: Response) {
    try {
        const { origin, destination, preferences } = req.body as RouteRequest;

        // Validate input
        if (!origin || !destination) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Both origin and destination are required',
            });
        }

        if (typeof origin !== 'string' || typeof destination !== 'string') {
            return res.status(400).json({
                error: 'Invalid input',
                message: 'Origin and destination must be strings',
            });
        }

        // Calculate route
        const result = await calculateRoute({ origin, destination, preferences });

        if (!result) {
            return res.status(404).json({
                error: 'No route found',
                message: `No route found from ${origin} to ${destination}. Please check the bus stop names and try again.`,
            });
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in postRoute:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while calculating the route',
        });
    }
}
