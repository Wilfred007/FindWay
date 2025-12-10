import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware
 */
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('Error:', err);

    // Default error
    let statusCode = 500;
    let message = 'Internal server error';

    // Check if error has status code
    if ('statusCode' in err && typeof err.statusCode === 'number') {
        statusCode = err.statusCode;
    }

    // Use error message in development, generic message in production
    if (process.env.NODE_ENV === 'development') {
        message = err.message;
    }

    res.status(statusCode).json({
        error: err.name || 'Error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
