import { Request, Response, NextFunction } from 'express';

export type RequestHandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export type ErrorHandlerFunction = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => void;