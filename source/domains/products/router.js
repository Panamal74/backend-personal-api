// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import validationSchema from './_schemas/createProd';
import { authenticate, limiter, validator, validateProduct } from '../../helpers';

const route = express.Router();

route.get('/', [ limiter(1000, 60 * 1000) ], restRequests.get);
route.post('/', [ authenticate({ staff: true }), limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);

route.get('/:productHash', [ limiter(1000, 60 * 1000) ], restRequests.search);
route.put('/:productHash', [ authenticate({ staff: true }), limiter(1000, 60 * 1000), validateProduct() ], restRequests.replace);
route.delete('/:productHash', [ authenticate({ staff: true }), limiter(1000, 60 * 1000) ], restRequests.remove);

export { route as products };
