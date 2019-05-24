// Core
import dg from 'debug';

// Instruments
import { Staff } from '../../controllers';

const debug = dg('router:staff');

export const get = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const staff = new Staff();
        const data = await staff.find();

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const post = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const staff = new Staff(req.body);
        const data = await staff.create();

        res.status(201).json({ data });
    } catch (error) {
        if (error.name === 'MongoError') {
            const errCode = error.code;
            if (errCode === 11000) {
                const newError = new Error();
                newError.name = 'ValidationError';
                newError.message = `User with email address "${req.body.email}" already exists`;
                newError.statusCode = 400;

                return next(newError);
            }
        }
        next(error);
    }
};
