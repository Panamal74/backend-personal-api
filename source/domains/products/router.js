// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import validationSchema from './_schemas/createProd';
import { authenticate, validator, limiter } from '../../helpers';

const route = express.Router();

route.get('/', [ limiter(1000, 60 * 1000) ], restRequests.get);
route.post('/', [ authenticate, limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);

route.get('/:productHash', [ limiter(1000, 60 * 1000) ], restRequests.getByHash);
route.put('/:productHash', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.putByHash);
route.delete('/:productHash', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.deleteByHash);

export { route as products };