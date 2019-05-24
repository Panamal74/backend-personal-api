// Core
import dg from 'debug';

// Instruments
import { Orders } from '../../controllers';
import { getOrderRight } from '../../helpers';

const debug = dg('router:orders');

export const getOrders = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders();
        const data = await orders.find(getOrderRight(req));

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const post = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const data = await orders.create();

        res.status(201).json({ data });
    } catch (error) {
        next(error);
    }
};

export const get = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders();
        const data = await orders.findByHash(getOrderRight(req));

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const put = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const data = await orders.replaceByHash(getOrderRight(req));

        res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders();
        const data = await orders.removeByHash(getOrderRight(req));

        res.status(204).json({ data });
    } catch (error) {
        next(error);
    }
};
