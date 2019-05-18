// Instruments
import { ValidationError } from '../errors';

function _structure(data) {
    if (!data) { // data exist error
        throw new ValidationError('Product data is missing or undefined')
    }
    if (data && typeof data !== 'object') { // data type error
        throw new ValidationError('Product data must be of type object')
    }
    if (Object.keys(data).length > 5) { // data structure error
        const possibleFields = ['title', 'description', 'price', 'discount', 'total'];
        const extraFields = Object.keys(data)
            .filter(field => possibleFields.indexOf(field) === -1);
        throw new ValidationError(`The Product object contains extra properties: ${extraFields.toString()}`);
    }

    return true;
}

function _type(data) {
    if (data.hasOwnProperty('title')) {
        if (typeof data.title !== 'string') { // type error
            throw new ValidationError('The value of the "title" field must be of type "string"');
        }
    }
    if (data.hasOwnProperty('description')) {
        if (typeof data.description !== 'string') { // type error
            throw new ValidationError('The value of the "description" field must be of type "string"');
        }
    }
    if (data.hasOwnProperty('price')) {
        if (typeof data.price !== 'number') { // type error
            throw new ValidationError('The value of the "price" field must be of type "number"');
        }
        if (data.price <= 0) { // value error
            throw new ValidationError('Cost cannot be less than or equal to zero');
        }
    }
    if (data.hasOwnProperty('discount')) {
        if (typeof data.discount !== 'number') { // type error
            throw new ValidationError('The value of the "discount" field must be of type "number"');
        }
        if (data.discount < 0 || data.discount > 50) {
            throw new ValidationError('Discount cannot be less than 0 or more than 50');
        }
    }
    if (data.hasOwnProperty('total')) {
        if (typeof data.total !== 'number') { // type error
            throw new ValidationError('The value of the "total" field must be of type "number"');
        }
        if (data.total < 0) { // value error
            throw new ValidationError('The quantity of goods specified in the "total" field cannot be less than zero');
        }
    }

    return true;
}

function _required(data) {
    if (!data.hasOwnProperty('title')
        && !data.hasOwnProperty('description')
        && !data.hasOwnProperty('price')
        && !data.hasOwnProperty('discount')
        && !data.hasOwnProperty('total'))
    {
        throw new ValidationError('Data from the object "Product" does not contain real changes');
    }

    return true;
}

export const validateProduct = () => (req, res, next) => {
    const product = req.body;
    try {
        _structure(product); // structure validation
        _type(product); // fields type validation
        _required(product); // required validation
        next()
    } catch (error) {
        next(error)
    }
};
