import { BusStop, BusStopSearchResult } from '../types';
import busStopsData from '../data/bus-stops.json';

const busStops: BusStop[] = busStopsData as BusStop[];

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

/**
 * Calculate similarity score between query and target string
 */
function similarityScore(query: string, target: string): number {
    const queryLower = query.toLowerCase().trim();
    const targetLower = target.toLowerCase().trim();

    // Exact match
    if (queryLower === targetLower) return 100;

    // Starts with query
    if (targetLower.startsWith(queryLower)) return 90;

    // Contains query
    if (targetLower.includes(queryLower)) return 80;

    // Levenshtein distance based similarity
    const distance = levenshteinDistance(queryLower, targetLower);
    const maxLength = Math.max(queryLower.length, targetLower.length);
    const similarity = ((maxLength - distance) / maxLength) * 70;

    return similarity;
}

/**
 * Search bus stops by query string
 */
export function searchBusStops(query: string, limit: number = 5): BusStopSearchResult {
    if (!query || query.trim().length === 0) {
        return { stops: [], query };
    }

    const results: Array<{ stop: BusStop; score: number }> = [];

    for (const stop of busStops) {
        // Check main name
        let maxScore = similarityScore(query, stop.name);

        // Check aliases
        if (stop.aliases) {
            for (const alias of stop.aliases) {
                const aliasScore = similarityScore(query, alias);
                maxScore = Math.max(maxScore, aliasScore);
            }
        }

        // Only include results with reasonable similarity
        if (maxScore > 30) {
            results.push({ stop, score: maxScore });
        }
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Return top results
    const topStops = results.slice(0, limit).map(r => r.stop);

    return { stops: topStops, query };
}

/**
 * Find bus stop by exact name
 */
export function findBusStopByName(name: string): BusStop | null {
    const nameLower = name.toLowerCase().trim();

    for (const stop of busStops) {
        if (stop.name.toLowerCase() === nameLower) {
            return stop;
        }

        // Check aliases
        if (stop.aliases) {
            for (const alias of stop.aliases) {
                if (alias.toLowerCase() === nameLower) {
                    return stop;
                }
            }
        }
    }

    return null;
}

/**
 * Get all bus stops
 */
export function getAllBusStops(): BusStop[] {
    return busStops;
}
