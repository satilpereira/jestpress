import { Express } from 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    status: number;
    message: string;
    data?: any;
    error?: {
      type?: string;
      description?: string;
    }
  }
}
