// Core
import dg from 'debug';

// Instruments
import { Products } from '../../controllers';

const debug = dg('router:products');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const products = new Products();
        const data = await products.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const products = new Products(req.body);
        const data = await products.create();

        res.status(201).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const search = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const products = new Products();
        const data = await products.findByHash(productHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const replace = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const products = new Products(req.body);
        const data = await products.replaceByHash(productHash);

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const { productHash } = req.params;
        const products = new Products();
        const data = await products.removeByHash(productHash);

        res.status(204).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
