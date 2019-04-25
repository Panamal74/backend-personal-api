// Core
import dg from 'debug';

// Instruments
// import { Products } from '../../controllers';

const debug = dg('router:products');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await [];
        // const products = new Products();
        // const data = await products.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await req.body;
        // const products = new Products(req.body);
        // const data = await products.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
