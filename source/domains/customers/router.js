// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import validationSchema from './_schemas/createCustomer';
import { authenticate, validator, limiter } from '../../helpers';

const route = express.Router();

route.get('/', restRequests.get);
route.post('/', [ authenticate, limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);

export { route as customers };