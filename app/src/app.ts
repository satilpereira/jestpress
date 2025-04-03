// import Logger from './api/v1/helpers/Logger';
import appV1 from './api/serverV1';
import Logger from '@/utils/Logger';

const log = new Logger();

import dotenv from 'dotenv';

dotenv.config();

// Informs if server is running on devmode or server mode
if (process.env.NODE_ENV === 'development') {
  log.info(`Running on development mode`);
  require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
  log.info(`Running on production mode`);
}

const port = process.env.PORT!;


if (process.env.NODE_ENV === 'development') {
  appV1.listen(port, () => {
    console.log(
      `Server up and running on http://${(process.env.NODE_ENV && 'localhost') || '127.0.0.1'
      }:${port}`
    );
  });
} else {
  appV1.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
}
