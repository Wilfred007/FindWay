import { Client, TravelMode, TrafficModel } from '@googlemaps/google-maps-services-js';
import { TrafficData, TrafficLevel } from '../types';

const client = new Client({});

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const USE_FREE_SERVICES = process.env.USE_FREE_SERVICES === 'true';

/**
 * Get directions between two points using Google Maps
 */
export async function getDirections(origin: string, destination: string) {
    if (!GOOGLE_MAPS_API_KEY || USE_FREE_SERVICES) {
        console.log('Google Maps API not configured, using fallback');
        return null;
    }

    try {
        const response = await client.directions({
            params: {
                origin,
                destination,
                mode: TravelMode.transit,
                departure_time: 'now',
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 5000,
        });

        if (response.data.status === 'OK' && response.data.routes.length > 0) {
            return response.data.routes[0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching directions from Google Maps:', error);
        return null;
    }
}

/**
 * Get distance matrix between multiple origins and destinations
 */
export async function getDistanceMatrix(origins: string[], destinations: string[]) {
    if (!GOOGLE_MAPS_API_KEY || USE_FREE_SERVICES) {
        return null;
    }

    try {
        const response = await client.distancematrix({
            params: {
                origins,
                destinations,
                mode: TravelMode.transit,
                departure_time: 'now',
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 5000,
        });

        if (response.data.status === 'OK') {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error('Error fetching distance matrix from Google Maps:', error);
        return null;
    }
}

/**
 * Get traffic data for a route
 */
export async function getTrafficData(origin: string, destination: string): Promise<TrafficData> {
    if (!GOOGLE_MAPS_API_KEY || USE_FREE_SERVICES) {
        return getMockTrafficData();
    }

    try {
        const response = await client.directions({
            params: {
                origin,
                destination,
                mode: TravelMode.driving,
                departure_time: 'now',
                traffic_model: TrafficModel.best_guess,
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 5000,
        });

        if (response.data.status === 'OK' && response.data.routes.length > 0) {
            const route = response.data.routes[0];
            const leg = route.legs[0];

            // Calculate traffic level based on duration vs duration_in_traffic
            const normalDuration = leg.duration.value;
            const trafficDuration = leg.duration_in_traffic?.value || normalDuration;
            const delay = trafficDuration - normalDuration;
            const delayMinutes = Math.round(delay / 60);

            let level: TrafficLevel;
            if (delayMinutes < 5) {
                level = 'Light';
            } else if (delayMinutes < 15) {
                level = 'Medium';
            } else {
                level = 'Heavy';
            }

            return {
                level,
                delay: delayMinutes,
                lastUpdated: new Date(),
            };
        }

        return getMockTrafficData();
    } catch (error) {
        console.error('Error fetching traffic data from Google Maps:', error);
        return getMockTrafficData();
    }
}

/**
 * Get place autocomplete suggestions
 */
export async function getPlaceAutocomplete(query: string) {
    if (!GOOGLE_MAPS_API_KEY || USE_FREE_SERVICES) {
        return null;
    }

    try {
        const response = await client.placeAutocomplete({
            params: {
                input: query,
                components: ['country:ng'], // Restrict to Nigeria
                location: { lat: 6.5244, lng: 3.3792 }, // Lagos coordinates
                radius: 50000, // 50km radius
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 3000,
        });

        if (response.data.status === 'OK') {
            return response.data.predictions;
        }

        return null;
    } catch (error) {
        console.error('Error fetching autocomplete from Google Maps:', error);
        return null;
    }
}

/**
 * Get mock traffic data based on time of day
 */
function getMockTrafficData(): TrafficData {
    const hour = new Date().getHours();

    // Rush hours: 7-10 AM and 4-8 PM
    if ((hour >= 7 && hour <= 10) || (hour >= 16 && hour <= 20)) {
        return {
            level: 'Heavy',
            delay: Math.floor(Math.random() * 20) + 10, // 10-30 minutes
            lastUpdated: new Date(),
        };
    }

    // Mid-day: 11 AM - 3 PM
    if (hour >= 11 && hour <= 15) {
        return {
            level: 'Medium',
            delay: Math.floor(Math.random() * 10) + 3, // 3-13 minutes
            lastUpdated: new Date(),
        };
    }

    // Off-peak hours
    return {
        level: 'Light',
        delay: Math.floor(Math.random() * 5), // 0-5 minutes
        lastUpdated: new Date(),
    };
}
