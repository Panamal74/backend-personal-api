// Core
import dg from 'debug';

// Instruments
import { Orders } from '../../controllers';

const debug = dg('router:orders');

export const getOrders = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders();
        const data = await orders.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const orders = new Orders(req.body);
        const data = await orders.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders();
        const data = await orders.findByHash(orderHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const put = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders(req.body);
        const data = await orders.replaceByHash(orderHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders();
        const data = await orders.removeByHash(orderHash);

        res.status(204).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
