// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
// import validationSchema from './_schemas/createOrder';
// import { authenticate, validator, limiter } from '../../helpers';
import { authenticate, limiter } from '../../helpers';
import { validateOrder } from "../../helpers/validators/orders";

const route = express.Router();

route.get('/', restRequests.getOrders);
route.post('/', [ authenticate, limiter(1000, 60 * 1000), validateOrder('create') ], restRequests.post);
route.get('/:orderHash', [ limiter(1000, 60 * 1000) ], restRequests.get);
route.put('/:orderHash', [ authenticate, limiter(1000, 60 * 1000), validateOrder('replace') ], restRequests.put);
route.delete('/:orderHash', [ authenticate, limiter(1000, 60 * 1000) ], restRequests.remove);

export { route as orders };