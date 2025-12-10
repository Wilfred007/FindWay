import { Route, RouteStep, RouteResult, RouteRequest } from '../types';
import routesData from '../data/routes.json';
import { findBusStopByName } from './searchService';
import { getTrafficData } from './googleMapsService';

const routes: Route[] = routesData as Route[];

interface GraphNode {
    stop: string;
    distance: number;
    time: number;
    fare: number;
    path: RouteStep[];
}

/**
 * Build adjacency list from routes data
 */
function buildGraph(): Map<string, Route[]> {
    const graph = new Map<string, Route[]>();

    for (const route of routes) {
        if (!graph.has(route.from)) {
            graph.set(route.from, []);
        }
        graph.get(route.from)!.push(route);
    }

    return graph;
}

/**
 * Calculate route using breadth-first search with optimizations
 */
export async function calculateRoute(request: RouteRequest): Promise<RouteResult | null> {
    const { origin, destination, preferences } = request;

    // Validate bus stops exist
    const originStop = findBusStopByName(origin);
    const destinationStop = findBusStopByName(destination);

    if (!originStop || !destinationStop) {
        return null;
    }

    // Same origin and destination
    if (originStop.id === destinationStop.id) {
        return {
            steps: [],
            total_time: 0,
            total_fare: 0,
            total_distance: 0,
            traffic: 'Light',
        };
    }

    const graph = buildGraph();

    // BFS to find shortest path
    const queue: GraphNode[] = [{
        stop: originStop.name,
        distance: 0,
        time: 0,
        fare: 0,
        path: [],
    }];

    const visited = new Set<string>();
    const allPaths: GraphNode[] = [];

    while (queue.length > 0) {
        const current = queue.shift()!;

        // Found destination
        if (current.stop === destinationStop.name) {
            allPaths.push(current);
            continue;
        }

        // Already visited
        if (visited.has(current.stop)) {
            continue;
        }

        visited.add(current.stop);

        // Get all routes from current stop
        const availableRoutes = graph.get(current.stop) || [];

        for (const route of availableRoutes) {
            // Avoid cycles (don't revisit stops in current path)
            const stopsInPath = current.path.map(step => step.to);
            if (stopsInPath.includes(route.to)) {
                continue;
            }

            // Create new step
            const step: RouteStep = {
                bus: route.busNumber,
                busType: route.busType,
                from: route.from,
                to: route.to,
                fare: route.fare,
                time: route.time,
                distance: route.distance,
                instructions: `Take ${route.busNumber} (${route.busType}) from ${route.from} to ${route.to}`,
            };

            // Add to queue
            queue.push({
                stop: route.to,
                distance: current.distance + (route.distance || 0),
                time: current.time + route.time,
                fare: current.fare + route.fare,
                path: [...current.path, step],
            });
        }
    }

    // No path found
    if (allPaths.length === 0) {
        return null;
    }

    // Select best path based on preferences
    let bestPath: GraphNode;

    if (preferences?.fastest) {
        // Sort by time
        allPaths.sort((a, b) => a.time - b.time);
        bestPath = allPaths[0];
    } else if (preferences?.cheapest) {
        // Sort by fare
        allPaths.sort((a, b) => a.fare - b.fare);
        bestPath = allPaths[0];
    } else {
        // Default: balance between time and transfers (fewer transfers preferred)
        allPaths.sort((a, b) => {
            const aScore = a.time + (a.path.length * 5); // Penalize transfers
            const bScore = b.time + (b.path.length * 5);
            return aScore - bScore;
        });
        bestPath = allPaths[0];
    }

    // Get traffic data
    const trafficData = await getTrafficData(origin, destination);

    return {
        steps: bestPath.path,
        total_time: bestPath.time + trafficData.delay,
        total_fare: bestPath.fare,
        total_distance: bestPath.distance,
        traffic: trafficData.level,
    };
}

/**
 * Get direct routes from a stop
 */
export function getDirectRoutes(from: string): Route[] {
    return routes.filter(route => route.from === from);
}

/**
 * Get all routes
 */
export function getAllRoutes(): Route[] {
    return routes;
}
