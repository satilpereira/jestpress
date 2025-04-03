import { Response, Request, NextFunction } from 'express';
import { HttpStatusCode } from '../constants/HttpStatusCode.js';
import { Range } from '@/types/utility.js';

/**
 * Union type of all HTTP status code values from the HttpStatusCode enum
 */
type HttpStatusValues = (typeof HttpStatusCode)[keyof typeof HttpStatusCode];

/**
 * Type representing valid informational status codes (100-199)
 * Only includes values that are defined in the HttpStatusCode enum
 */
type InformationalStatuses = Extract<HttpStatusValues, Range<100, 200>>;

/**
 * Type representing valid success status codes (200-299)
 * Only includes values that are defined in the HttpStatusCode enum
 */
type SuccessStatuses = Extract<HttpStatusValues, Range<200, 300>>;

/**
 * Type representing valid redirection status codes (300-399)
 * Only includes values that are defined in the HttpStatusCode enum
 */
type RedirectionStatuses = Extract<HttpStatusValues, Range<300, 400>>;

/**
 * Type representing valid client error status codes (400-499)
 * Only includes values that are defined in the HttpStatusCode enum
 */
type ClientErrorStatuses = Extract<HttpStatusValues, Range<400, 500>>;

/**
 * Type representing valid server error status codes (500-599)
 * Only includes values that are defined in the HttpStatusCode enum
 */
type ServerErrorStatuses = Extract<HttpStatusValues, Range<500, 600>>;

/**
 * Interface for success responses (2xx status codes)
 */
export interface SuccessResponse {
  status: SuccessStatuses;
  message: string;
  data: unknown;
}

/**
 * Interface for informational responses (1xx status codes)
 */
export interface InformationalResponse {
  status: InformationalStatuses;
  message?: string;
}

/**
 * Interface for redirection responses (3xx status codes)
 */
export interface RedirectionResponse {
  status: RedirectionStatuses;
  message?: string;
  redirectUrl?: string;
}

/**
 * Interface for error responses (4xx and 5xx status codes)
 */
export interface ErrorResponse {
  status: ClientErrorStatuses | ServerErrorStatuses;
  message: string;
  description: string | Record<string, unknown>;
  error: unknown;
}

/**
 * Union type of all possible response types
 */
export type ResponseType =
  | SuccessResponse
  | ErrorResponse
  | InformationalResponse
  | RedirectionResponse;

// Export status code types for external use
export type {
  InformationalStatuses,
  SuccessStatuses,
  RedirectionStatuses,
  ClientErrorStatuses,
  ServerErrorStatuses,
  HttpStatusValues,
};

/**
 * Extend Express Response interface to include our custom reply method
 */
declare module 'express-serve-static-core' {
  interface Response {
    /**
     * Custom response method that standardizes API responses
     * @param params - Response parameters of type ResponseType
     */
    reply: (params: ResponseType) => void;
  }
}

/**
 * Middleware that extends Express Response object with a standardized reply method
 * This allows for consistent API responses throughout the application
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 */
export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Custom reply method added to Response object
   * Formats and sends responses based on their status code type
   *
   * @param params - Response parameters with appropriate status code and data
   */
  res.reply = (params: ResponseType) => {
    const { status, message } = params;

    // Initialize response object with common properties
    const response: Record<string, unknown> = { status, message };

    // Format response based on status code range
    switch (true) {
      case status >= 400: {
        // Handle error responses (4xx and 5xx)
        const { description, error } = params as ErrorResponse;
        response.description = description || 'An error occurred';
        response.error = error || null;
        break;
      }
      case status >= 300: {
        // Handle redirection responses (3xx)
        const { redirectUrl } = params as RedirectionResponse;
        response.redirectUrl = redirectUrl || null;
        break;
      }
      case status >= 200: {
        // Handle success responses (2xx)
        const { data } = params as SuccessResponse;
        response.data = data;
        break;
      }
      case status >= 100: {
        // Handle informational responses (1xx)
        response.message = message || 'Informational response';
        break;
      }
    }

    // Send formatted response with appropriate status code
    res.status(status).json(response);
  };

  // Continue to next middleware
  next();
};
