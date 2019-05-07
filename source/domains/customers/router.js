// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
// import validationSchema from './_schemas/createCustomer';
// import { authenticate, validator, limiter } from '../../helpers';
import { authenticate, limiter } from '../../helpers';

const route = express.Router();

route.get('/', [ authenticate ], restRequests.get);
route.post('/', [ limiter(1000, 60 * 1000) ], restRequests.post);
// route.post('/', [ limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);
route.get('/:customerHash', [ authenticate ], restRequests.getByHash);
route.put('/:customerHash', [ authenticate ], restRequests.putByHash);
route.delete('/:customerHash', [ authenticate ], restRequests.deleteByHash);

export { route as customers };