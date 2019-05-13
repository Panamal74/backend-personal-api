// Core
import dg from 'debug';
const debug = dg('helper:orderValidator');

import {
    Orders as OrderModel,
    Products as ProdModel,
    Customers as UserModel,
} from '../../models';

import { ValidationError } from "../errors";

const orders = new OrderModel();
const products = new ProdModel();
const customers = new UserModel();

function structureValidation(data) {
    if (!data) { // data exist error
        debug(`Error: Order data is missing or undefined`);
        throw new ValidationError('Order data is missing or undefined')
    }
    if (data && typeof data !== 'object') { // data type error
        debug(`Error: Order data must be of type object`);
        throw new ValidationError('Order data must be of type object')
    }
    if (Object.keys(data).length > 4) { // data structure error
        const possibleFields = ['uid', 'pid', 'count', 'comment'];
        const extraFields = Object.keys(data)
            .filter(field => possibleFields.indexOf(field) === -1);
        debug(`Error: The Order object contains extra properties: ${extraFields.toString()}`);
        throw new ValidationError(`The Order object contains extra properties: ${extraFields.toString()}`);
    }

    return true;
}

function typeValidation(data) {
    if (data.hasOwnProperty('uid')) {
        if (typeof data.uid !== 'string') { // type error
            debug(`Error: The value of the "uid" field must be of type "string"`);
            throw new ValidationError('The value of the "uid" field must be of type "string"');
        }
        if (!data.uid.match(/^[0-9a-fA-F]{24}$/)) { // value error
            debug(`Error: The value of the "uid" field (${data.uid}) cannot be converted to an ObjectId`);
            throw new ValidationError(`The value of the "uid" field (${data.uid}) cannot be converted to an ObjectId`)
        }
    }
    if (data.hasOwnProperty('pid')) {
        if (typeof data.pid !== 'string') { // type error
            debug(`Error: The value of the "pid" field must be of type "string"`);
            throw new ValidationError('The value of the "pid" field must be of type "string"');
        }
        if (!data.pid.match(/^[0-9a-fA-F]{24}$/)) { // value error
            debug(`Error: The value of the "pid" field (${data.pid}) cannot be converted to an ObjectId`);
            throw new ValidationError(`The value of the "pid" field (${data.pid}) cannot be converted to an ObjectId`)
        }
    }
    if (data.hasOwnProperty('count')) {
        if (typeof data.count !== 'number') { // type error
            debug(`Error: The value of the "count" field must be of type "number"`);
            throw new ValidationError('The value of the "count" field must be of type "number"');
        }
        if (data.count < 1) { // value error
            debug(`Error: The value of the "count" field cannot be less than 1`);
            throw new ValidationError('The value of the "count" field cannot be less than 1');
        }
    }
    if (data.hasOwnProperty('comment')) {
        if (typeof data.comment !== 'string') { // type error
            debug(`Error: The value of the "comment" field must be of type "string"`);
            throw new ValidationError('The value of the "comment" field must be of type "string"');
        }
    }

    return true;
}

function requiredValidation(data) {
    if (!data.hasOwnProperty('uid')) {
        debug(`Error: Missing required property "uid"`);
        throw new ValidationError('Missing required property "uid"');
    }
    if (!data.hasOwnProperty('pid')) {
        debug(`Error: Missing required property "pid"`);
        throw new ValidationError('Missing required property "pid"');
    }
    if (!data.hasOwnProperty('count')) {
        debug(`Error: Missing required property "count"`);
        throw new ValidationError('Missing required property "count"');
    }

    return true;
}

async function existUidValidation(uid) {
    const userData = await customers.findById(uid);
    if (!userData) { // exist error
        debug(`Error: Customer with ID '${uid}' does not exist in customers collection`);
        throw new ValidationError(`Customer with ID '${uid}' does not exist in customers collection`)
    }

    return true;
}

async function existPidValidation(pid) {
    const prodData = await products.findById(pid);
    if (!prodData) { // exist error
        debug(`Error: Product with ID '${pid}' does not exist in products collection`);
        throw new ValidationError(`Product with ID '${pid}' does not exist in products collection`)
    }

    return prodData;
}

export async function validateOrder(data, hash) {
    await structureValidation(data); // structure validation
    await typeValidation(data); // fields type validation

    if (!hash) { // => create new order
        await requiredValidation(data); // required validation
        await existUidValidation(data.uid); // exist user validation
        const { hash: prodHash, title, total } = await existPidValidation(data.pid); // exist product validation && get product data
        if (total - data.count < 0) { // count error
            throw new ValidationError(`The requested quantity of ${title} (${data.count} units) is misses`);
        }

        return {
            hash: prodHash,
            total
        };
    }

    if (hash) { // => update existing order
        const oldOrder = await orders.findByHash({ hash });
        if (!oldOrder) { // order not found error
            debug(`Error: Requested order with key "${hash}" not found`);
            throw new ValidationError(`Requested order with key "${hash}" not found`);
        }

        if (data.hasOwnProperty('uid') && data.uid !== String(oldOrder.uid._id)) {
            debug(`Error: Unable to change customer ID. To perform the operation, please delete the current order and create a new one`);
            throw new ValidationError( // change user error
                'Unable to change customer ID. To perform the operation, please delete the current order and create a new one'
            );
        }

        if (data.hasOwnProperty('pid') && data.pid !== String(oldOrder.pid._id)) {
            debug(`Error: Unable to change product ID. To perform the operation, please delete the current order and create a new one`);
            throw new ValidationError( // change product error
                'Unable to change product ID. To perform the operation, please delete the current order and create a new one'
            );
        }

        if (data.hasOwnProperty('count')) {
            const prodId = data.hasOwnProperty('pid') ? data.pid : oldOrder.pid._id;
            const { hash: prodHash, title, total } = await existPidValidation(prodId); // exist product validation && get product data
            const differenceCount = data.count - oldOrder.count;
            if (total - differenceCount < 0) { // count error
                debug(`Error: The requested quantity of ${title} (${data.count} units) is misses`);
                throw new ValidationError(`The requested quantity of ${title} (${data.count} units) is misses`);
            }

            return {
                hash: prodHash,
                total,
                difference: differenceCount
            };
        }

        return false;
    }
}