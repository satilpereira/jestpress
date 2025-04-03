import { Router } from 'express';

import { helloGetController } from '@/controllers/hello/get';
import { helloErrorController } from '@/controllers/hello/error';

const helloRouter = Router();

// Append routes to the router
helloRouter.get('/', helloGetController);
helloRouter.get('/error', helloErrorController);

export default helloRouter;