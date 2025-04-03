import { HttpStatusCode, ErrorHandlerFunction } from '@/middlewares/barrel';
import { SERVER_ERRORS, ServerError } from '@/constants/ErrorTypes';

// Define interfaces for different error types
interface BaseError {
  message?: string;
  stack?: string;
}

interface ExpressError extends BaseError {
  status?: number;
  statusCode?: number;
}

interface AppError extends ExpressError {
  type?: ServerError;
  description?: string;
  details?: unknown;
}

// Type guards to check the error type
function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' &&
    error !== null &&
    ('type' in error || 'description' in error);
}

function isExpressError(error: unknown): error is ExpressError {
  return typeof error === 'object' &&
    error !== null &&
    ('status' in error || 'statusCode' in error);
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Server-side error handling middleware for Express applications
 * Catches errors thrown in route handlers and formats them into standardized responses
 * 
 * @param error - The error object caught by Express
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
const errorHandlingMiddleware: ErrorHandlerFunction = (
  error,
  req,
  res,
  next
): void => {
  // If headers have already been sent, let Express handle it
  if (res.headersSent) {
    return next(error);
  }

  // Log the error for debugging
  console.error('Error caught by middleware:', error);

  // Determine if we're in development mode
  const isDev = process.env.NODE_ENV !== 'production';

  // Default error response
  let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let description = 'An unexpected error occurred on the server';
  let errorDetails: unknown = 'An internal server error occurred';
  let errorType: ServerError = SERVER_ERRORS.INTERNAL_SERVER_ERROR;

  // Handle different error types
  if (isAppError(error)) {
    // Handle custom application errors
    statusCode = error.statusCode || error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
    message = error.message || message;
    description = error.description || description;
    errorType = error.type || errorType;
    errorDetails = isDev ? (error.details || error.stack || error) : errorDetails;
  } else if (isExpressError(error)) {
    // Handle Express errors
    statusCode = error.statusCode || error.status || HttpStatusCode.INTERNAL_SERVER_ERROR;
    message = error.message || message;
    errorDetails = isDev ? (error.stack || error) : errorDetails;
  } else if (isError(error)) {
    // Handle standard JavaScript errors
    message = error.message || message;
    errorDetails = isDev ? error.stack : errorDetails;
  }

  // Send the response
  res.reply({
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    message,
    description,
    error: {
      type: errorType,
      details: errorDetails
    }
  });
};

export default errorHandlingMiddleware;