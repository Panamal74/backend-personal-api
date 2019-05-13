// Core
import express from 'express';

// Handlers
import * as restRequests from './';

// Instruments
import validationSchema from './_schemas/createStaff';
import { authenticate, validator, limiter } from '../../helpers';

const route = express.Router();

route.get('/', [ authenticate('staff'), limiter(1000, 60 * 1000) ], restRequests.get);
route.post('/', [ limiter(1000, 60 * 1000), validator(validationSchema) ], restRequests.post);

export { route as staff };