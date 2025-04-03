import { RequestHandlerFunction } from '@/controllers/barrel';

export const helloErrorController: RequestHandlerFunction = async (req, res, next) => {
  try {
    // Simulate an async operation that fails
    await new Promise((_, reject) => setTimeout(() => reject(new Error('Test error')), 100));
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};
