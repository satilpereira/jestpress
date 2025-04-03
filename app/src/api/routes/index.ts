import { Application } from 'express'
import helloRouter from '@/routes/v1/helloRouter'

/**
 * Registers v1 API routes on the given Express application
 */
export const routesExecV1 = (app: Application): void => {
  app.use('/api/v1/hello', helloRouter);
}