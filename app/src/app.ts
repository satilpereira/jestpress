import Logger from './api/v1/helpers/Logger';
import app from './api/v1/server';

import dotenv from 'dotenv';

dotenv.config();
const log = new Logger();
const port = process.env.PORT!;

if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    log.success(
      `Server up and running on http://${
        (process.env.NODE_ENV && 'localhost') || '127.0.0.1'
      }:${port}`
    );
  });
} else {
  app.listen(port, () => {
    log.success(`Server up and running on port ${port}`);
  });
}
