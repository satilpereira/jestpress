import { RequestHandlerFunction, HttpStatusCode } from '@/controllers/barrel';

export const helloGetController: RequestHandlerFunction = async (req, res, next) => {
  try {
    res.reply({
      status: HttpStatusCode.OK,
      message: 'Hello, from the hello controller!',
      data: {
        message: 'Hello, world!',
      },
    })
  } catch (error) {
    next(error); // Pass error to the error handling middleware
  }
};
