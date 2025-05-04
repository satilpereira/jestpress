/**
 * @file serverV1.ts
 * @description This file sets up the Express server for the API version 1.
 * It configures middleware, routes, and error handling.
 * @author Satil Pereira
 */
import express from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import { responseMiddleware } from '@/middlewares/response.js';
import errorHandlingMiddleware from '@/middlewares/errorHandling.js';
import helmet from 'helmet';
import { routesExecV1 } from '@/routes/index';

// Set up Express app
const app: express.Application = express();

const environment = process.env.NODE_ENV;

// ?Set up Express app to use helmet so it doesn't get hurt 😵
app.use(helmet());

// ?Apply rate limiting and speed limiting only in production environment
if (environment === 'production') {
  // Set up rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    handler: (req, res, next) => {
      res.status(429).json({
        message: 'Too many requests, please try again later.',
        description: 'You have exceeded the 100 requests in 15 minutes limit!',
        error: 'Rate limit exceeded',
      });
      next();
    }
  }); // this total to 100 requests per 15 minutes, or 6,66 requests per hour
  app.use(limiter);

  // Set up speed limiter to prevent abuse
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 5,
    delayMs: (hits) => hits * 100, // Delay in milliseconds
  });
  app.use(speedLimiter);
}

// ?Set up Express app to use the response middleware
app.use(responseMiddleware);

// ?Set up Express app to use JSON as the body parser
app.use(express.json());

// ?Register routes
routesExecV1(app);

// ?Register error handling middleware AFTER all routes
app.use(errorHandlingMiddleware);

export default app;
