// Core
import dg from 'debug';

// Instruments
import { Customers } from '../../controllers';

const debug = dg('router:customers');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customers = new Customers();
        const data = await customers.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const customers = new Customers(req.body);
        const data = await customers.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { customerHash } = req.params;
        const customers = new Customers();
        const data = await customers.findByHash({ hash: customerHash });

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const putByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { customerHash } = req.params;
        const customers = new Customers(req.body);
        const data = await customers.replaceByHash({ hash: customerHash });

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteByHash = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { customerHash } = req.params;
        const customers = new Customers();
        const data = await customers.removeByHash({ hash: customerHash });

        res.status(204).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
