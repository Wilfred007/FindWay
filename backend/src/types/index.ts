export interface BusStop {
    id: number;
    name: string;
    lat: number;
    lng: number;
    aliases?: string[];
}

export interface Route {
    from: string;
    to: string;
    fare: number;
    time: number;
    busNumber: string;
    busType: 'BRT' | 'Danfo' | 'Molue' | 'Keke';
    distance?: number;
}

export interface RouteStep {
    bus: string;
    busType: string;
    from: string;
    to: string;
    fare: number;
    time: number;
    distance?: number;
    instructions: string;
}

export interface RouteResult {
    steps: RouteStep[];
    total_time: number;
    total_fare: number;
    total_distance?: number;
    traffic: TrafficLevel;
}

export type TrafficLevel = 'Light' | 'Medium' | 'Heavy';

export interface TrafficData {
    level: TrafficLevel;
    delay: number;
    lastUpdated: Date;
}

export interface GoogleMapsConfig {
    apiKey: string;
    timeout?: number;
}

export interface RouteRequest {
    origin: string;
    destination: string;
    preferences?: {
        fastest?: boolean;
        cheapest?: boolean;
    };
}

export interface BusStopSearchResult {
    stops: BusStop[];
    query: string;
}
