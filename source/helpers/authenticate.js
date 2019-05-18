// Instruments
import {ForbiddenError, NotFoundError, ValidationError} from './';

export const authenticate = (only = null) => (req, res, next) => {
    if (!req.session.hasOwnProperty('user')) {
        return next(new NotFoundError('Cookie not found', 401));
    }

    const user = req.session.user;

    if (!user || !user.hasOwnProperty('hash') || !user.hasOwnProperty('role')) {
        return next(new ValidationError('Authentication credentials are not valid', 401));
    }

    if (only) {
        if (!only.hasOwnProperty(user.role) || only[user.role] !== true) {
            return next(new ForbiddenError('Not enough rights to perform the operation', 401));
        }
    }

    next();
};
