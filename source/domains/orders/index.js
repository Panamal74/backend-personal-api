// Core
import dg from 'debug';

// Instruments
// import { Orders } from '../../controllers';

const debug = dg('router:orders');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await [];
        // const orders = new Orders();
        // const data = await orders.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await req.body;
        // const orders = new Orders(req.body);
        // const data = await orders.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
