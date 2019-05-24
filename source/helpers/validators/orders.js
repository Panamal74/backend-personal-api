// Instruments
import { ValidationError } from '../errors';

function _structure(data) {
    if (!data) { // data exist error
        throw new ValidationError('Order data is missing or undefined');
    }
    if (data && typeof data !== 'object') { // data type error
        throw new ValidationError('Order data must be of type object');
    }
    if (Object.keys(data).length > 4) { // data structure error
        const possibleFields = [ 'uid', 'pid', 'count', 'comment' ];
        const extraFields = Object.keys(data)
            .filter((field) => possibleFields.indexOf(field) === -1);
        throw new ValidationError(`The Order object contains extra properties: ${extraFields.toString()}`);
    }

    return true;
}

function _type(data) {
    if (data.hasOwnProperty('uid')) {
        if (typeof data.uid !== 'string') { // type error
            throw new ValidationError('The value of the "uid" field must be of type "string"');
        }
        if (!data.uid.match(/^[0-9a-fA-F]{24}$/)) { // value error
            throw new ValidationError(`The value of the "uid" field (${data.uid}) cannot be converted to an ObjectId`);
        }
    }
    if (data.hasOwnProperty('pid')) {
        if (typeof data.pid !== 'string') { // type error
            throw new ValidationError('The value of the "pid" field must be of type "string"');
        }
        if (!data.pid.match(/^[0-9a-fA-F]{24}$/)) { // value error
            throw new ValidationError(`The value of the "pid" field (${data.pid}) cannot be converted to an ObjectId`);
        }
    }
    if (data.hasOwnProperty('count')) {
        if (typeof data.count !== 'number') { // type error
            throw new ValidationError('The value of the "count" field must be of type "number"');
        }
        if (data.count < 1) { // value error
            throw new ValidationError('The value of the "count" field cannot be less than 1');
        }
    }
    if (data.hasOwnProperty('comment')) {
        if (typeof data.comment !== 'string') { // type error
            throw new ValidationError('The value of the "comment" field must be of type "string"');
        }
    }

    return true;
}

function _required(data, method) {
    if (method === 'create') {
        if (!data.hasOwnProperty('uid')) {
            throw new ValidationError('Missing required property "uid"');
        }
        if (!data.hasOwnProperty('pid')) {
            throw new ValidationError('Missing required property "pid"');
        }
        if (!data.hasOwnProperty('count')) {
            throw new ValidationError('Missing required property "count"');
        }
    }

    if (method === 'replace') {
        if (!data.hasOwnProperty('uid')
            && !data.hasOwnProperty('pid')
            && !data.hasOwnProperty('count')
            && !data.hasOwnProperty('comment')) {
            throw new ValidationError('Data from the object "Order" does not contain real changes');
        }
    }

    return true;
}

export const validateOrder = (method = 'create') => (req, res, next) => {
    const order = req.body;
    try {
        _structure(order); // structure validation
        _type(order); // fields type validation
        _required(order, method); // required validation
        next();
    } catch (error) {
        next(error);
    }
};
