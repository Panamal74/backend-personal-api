// Core
import dg from 'debug';

// Instruments
// import { Customers } from '../../controllers';

const debug = dg('router:customers');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await req.body;
        // const data = await [];
        // const customers = new Customers();
        // const data = await customers.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const data = await [];
        // const customers = new Customers(req.body);
        // const data = await customers.create();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
