import express from 'express';

import helmet from 'helmet';

// Import helper classes
import Logger from './helpers/Logger';

const log = new Logger();

log.group('Server');

// Informs if server is running on devmode or server mode
if (process.env.NODE_ENV === 'development') {
  log.info(`Running on development mode`);
  require('dotenv').config();
} else if (process.env.NODE_ENV === 'production') {
  log.info(`Running on production mode`);
}

// Set up Express app
const app = express();

app.use(helmet());

// !TODO remove this route, it's just for testing purposes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Set up Express app to use JSON as the body parser
app.use(express.json());

export default app;
