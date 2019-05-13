// Core
import dg from 'debug';

// Instruments
import { Customers } from '../../controllers';
import { ForbiddenError } from "../../helpers/errors";

const debug = dg('router:customers');

function getRight(req) {
    const { hash } = req.session.user;
    const { customerHash } = req.params;
    if (hash !== customerHash) {
        throw new ForbiddenError('Not enough rights to perform the operation');
    }

    return customerHash;
}

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
        next(error);
    }
};

export const get = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getRight(req);
        const customers = new Customers();
        const data = await customers.findByHash(customerHash);

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const put = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getRight(req);
        const customers = new Customers(req.body);
        const data = await customers.replaceByHash(customerHash);

        res.status(200).json({ data });
    } catch (error) {
        next(error)
    }
};

export const remove = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customerHash = getRight(req);
        const customers = new Customers();
        const data = await customers.removeByHash(customerHash);

        res.status(204).json({ data });
    } catch (error) {
        next(error)
    }
};
