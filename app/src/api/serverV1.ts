/**
 * @file serverV1.ts
 * @description This file sets up the Express server for the API version 1.
 * It configures middleware, routes, and error handling.
 * @author Satil Pereira
 */
import express from 'express';
import { responseMiddleware } from '@/middlewares/response.js';
import errorHandlingMiddleware from '@/middlewares/errorHandling.js';
import helmet from 'helmet';
import { routesExecV1 } from '@/routes/index';

// Set up Express app
const app = express();

// Set up Express app to use helmet so it doesn't get hurt 😵
app.use(helmet());

// Set up Express app to use the response middleware
app.use(responseMiddleware);

// Set up Express app to use JSON as the body parser
app.use(express.json());

// Register routes
routesExecV1(app);

// Register error handling middleware AFTER all routes
app.use(errorHandlingMiddleware);

export default app;
