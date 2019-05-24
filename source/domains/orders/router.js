// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import { authenticate, limiter, validateOrder } from '../../helpers';

const route = express.Router();

const only = {
    staff:     true,
    customers: true,
};

route.get('/', [ authenticate(only), limiter(1000, 60 * 1000) ], restRequests.getOrders);
route.post('/', [ authenticate(only), limiter(1000, 60 * 1000), validateOrder('create') ], restRequests.post);
route.get('/:orderHash', [ authenticate(only), limiter(1000, 60 * 1000) ], restRequests.get);
route.put('/:orderHash', [ authenticate(only), limiter(1000, 60 * 1000), validateOrder('replace') ], restRequests.put);
route.delete('/:orderHash', [ authenticate(only), limiter(1000, 60 * 1000) ], restRequests.remove);

export { route as orders };
