// Core
import dg from 'debug';

// Instruments
import { Users } from '../../controllers';
import { NotFoundError } from "../../helpers/errors";

const debug = dg('router:auth');

export const post = async (req, res, next) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            return next(new NotFoundError('Data required for authorization not found', 400));
        }

        const [ , credentials ] = req.headers.authorization.split(' ');
        const [ email, password ] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');

        const user = new Users({ email, password });
        const { hash, role } = await user.login();

        req.session.user = { hash, role };
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
