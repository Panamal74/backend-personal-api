// Core
import express from 'express';

// Instruments
import { limiter } from '../../helpers';

// Handlers
import * as authenticate from './';

const route = express.Router();
const timeout = 0.5 * 60 * 1000; // 5 min

route.post('/login', [ limiter(3, timeout) ], authenticate.post);

export { route as auth };
