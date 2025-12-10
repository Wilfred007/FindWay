import rateLimit from 'express-rate-limit';

/**
 * Rate limiter middleware
 * Limits requests to 100 per 15 minutes per IP
 */
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: 'Too many requests',
        message: 'You have exceeded the 100 requests in 15 minutes limit. Please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
