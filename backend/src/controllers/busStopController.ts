import { Request, Response } from 'express';
import { searchBusStops, getAllBusStops } from '../services/searchService';

/**
 * GET /api/bus-stops?q=query
 * Search bus stops by query
 */
export function getBusStops(req: Request, res: Response) {
    try {
        const query = req.query.q as string;

        if (!query) {
            return res.status(400).json({
                error: 'Missing query parameter',
                message: 'Query parameter "q" is required',
            });
        }

        const result = searchBusStops(query, 5);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in getBusStops:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while searching bus stops',
        });
    }
}

/**
 * GET /api/bus-stops/all
 * Get all bus stops
 */
export function getAllBusStopsController(req: Request, res: Response) {
    try {
        const stops = getAllBusStops();

        return res.status(200).json({
            stops,
            count: stops.length,
        });
    } catch (error) {
        console.error('Error in getAllBusStopsController:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while fetching bus stops',
        });
    }
}
