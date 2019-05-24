// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import validationSchema from './_schemas/createCustomer';
import { authenticate, validator, limiter } from '../../helpers';

const route = express.Router();

route.get('/', [ authenticate({ staff: true }) ], restRequests.getCustomers);
route.post('/', [ limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);
route.get('/:customerHash', [ authenticate({ customers: true }) ], restRequests.get);
route.put('/:customerHash', [ authenticate({ customers: true }) ], restRequests.put);
route.delete('/:customerHash', [ authenticate({ customers: true }) ], restRequests.remove);

export { route as customers };
