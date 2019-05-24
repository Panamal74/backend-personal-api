// Core
import dg from 'debug';

// Instruments
import { Customers } from '../../controllers';
import { getUserRight } from '../../helpers';

const debug = dg('router:customers');

export const getCustomers = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customers = new Customers();
        const data = await customers.find();

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const post = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const data = await customers.create();

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

export const get = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getUserRight(req);
        const customers = new Customers();
        const data = await customers.findByHash({ hash: customerHash });

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const put = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getUserRight(req);
        const customers = new Customers(req.body);
        const data = await customers.replaceByHash({ hash: customerHash });

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getUserRight(req);
        const customers = new Customers();
        const data = await customers.removeByHash({ hash: customerHash });

        res.status(204).json({ data });
    } catch (error) {
        next(error);
    }
};
