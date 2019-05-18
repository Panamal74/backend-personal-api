import {ForbiddenError, ValidationError} from "./";
import {Customers as UserModel} from "../models";

export const getUserRight = (req) => {
    const { hash } = req.session.user;
    const params = req.params;

    if (!params.hasOwnProperty('customerHash')) {
        throw new ValidationError('Missing required parameters "customerHash"')
    }

    if (hash !== params.customerHash) {
        throw new ForbiddenError('Not enough rights to perform the operation');
    }

    return params.customerHash;
};

export const getOrderRight = (req) => {
    const { hash, role } = req.session.user;
    const params = req.params;

    const returnValue = {};

    if (role === 'customers') {
        returnValue["userHash"] = hash;
    }

    if (params.hasOwnProperty('orderHash')) {
        returnValue["orderHash"] = params.orderHash;
    }

    return returnValue;
};

export const getOrderCondition = async (data) => {
    const condition = {};
    const dataKeys = Object.keys(data);

    for (let i = 0; i < dataKeys.length; i++) {
        const key = dataKeys[i];
        if (key === 'orderHash') {
            condition["hash"] = data[key];
        } else if (key === 'userHash') {
            const customers = new UserModel();
            const user = await customers.findByHash({ hash: data[key] });
            if (!user) {
                throw new ForbiddenError('The user credentials are outdated or incorrect');
            }
            condition["uid"] = user._id;
        } else {
            condition[key] = data[key];
        }
    }

    return condition;
};