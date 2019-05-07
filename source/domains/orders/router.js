// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
// import validationSchema from './_schemas/createOrder';
// import { authenticate, validator, limiter } from '../../helpers';
import { authenticate, limiter } from '../../helpers';

const route = express.Router();

route.get('/', restRequests.get);
route.post('/', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.post);
// route.post('/', [ authenticate, limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);
route.get('/:orderHash', [ limiter(1000, 60 * 1000) ], restRequests.getByHash);
route.put('/:orderHash', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.putByHash);
route.delete('/:orderHash', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.deleteByHash);

export { route as orders };