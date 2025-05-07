import { HttpStatusCode, RequestHandlerFunction } from '@/middlewares/barrel';
import { RESOURCE_ERRORS, ResourceError } from '@/constants/ErrorTypes';

const resourceNotFoundMiddleware: RequestHandlerFunction = async (req, res) => {
  const errorType: ResourceError = RESOURCE_ERRORS.RESOURCE_NOT_FOUND;
  const statusCode = HttpStatusCode.NOT_FOUND;
  const message = 'Resource not found';
  const description = 'The requested resource could not be found on the server.';
  const details = {
    method: req.method,
    url: req.originalUrl,
  };

  res.reply({
    status: statusCode,
    message,
    description,
    error: {
      type: errorType,
      details
    }
  })
}

export default resourceNotFoundMiddleware;