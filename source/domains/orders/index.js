// Core
import dg from 'debug';

// Instruments
import { Orders } from '../../controllers';

const debug = dg('router:orders');

export const get = async (req, res) => {
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

export const getByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders();
        const data = await orders.findByHash({ hash: orderHash });

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const putByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders(req.body);
        const data = await orders.replaceByHash({ hash: orderHash });

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { orderHash } = req.params;
        const orders = new Orders();
        const data = await orders.removeByHash({ hash: orderHash });

        res.status(204).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
