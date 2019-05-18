import {
    Customers as CustomersModel,
    Orders as OrderModel,
    Products as ProdModel
} from '../models';
import {
    ServerError,
    ValidationError,
    getCustomer,
    getCustomers
} from "../helpers";

export class Customers {
    constructor(data) {
        this.models = {
            customers: new CustomersModel(data),
        };
    }

    async _getArray(oldArray, newArray, fieldName) {
        const remArray = await newArray
            .filter(item => item.action === "remove")
            .map(item => { return item[fieldName] });

        const addArray = await newArray
            .filter(item => item.action === "add")
            .map(item => { return item[fieldName] });

        const resArray = await oldArray
            .filter(item => remArray.indexOf(item[fieldName]) === -1)
            .map(item => { return item[fieldName] });

        await addArray.forEach(item => {
            if (resArray.indexOf(item) === -1) {
                resArray.push(item)
            }
        });

        if (resArray.length === 0) {
            throw new ValidationError(`Cannot delete all ${fieldName} items. There must be at least one ${fieldName}`)
        }

        const returnArray = await resArray.map((item, index) => {
            const retVal = {};
            retVal[fieldName] = item;
            if (index === 0) {
                retVal["primary"] = true;
            }
            return retVal;
        });

        return returnArray;
    }

    async create() {
        const data = await this.models.customers.create();

        return data;
    }

    async find() {
        const data = await this.models.customers.find();
        const returnData = await getCustomers(data);

        return returnData;
    }

    async findByHash(condition) {
        const data = await this.models.customers.findByHash(condition);
        const returnData = await getCustomer(data);

        return returnData;
    }

    async replaceByHash(condition) {
        const user = this.models.customers.data;

        if (user.emails || user.phones) {
            const {
                emails: oldEmails,
                phones: oldPhones
            } = await this.models.customers.findByHash(condition);

            if (user.emails) {
                this.models.customers.data.emails = await this._getArray(oldEmails, user.emails, 'email');
            }

            if (user.phones) {
                this.models.customers.data.phones = await this._getArray(oldPhones, user.phones, 'phone');
            }
        }

        const data = await this.models.customers.replaceByHash(condition.hash);
        const returnData = await getCustomer(data);

        return returnData;
    }

    async removeByHash(condition) {
        const userData = await this.models.customers.findByHash(condition);
        if (!userData) {
            throw new ValidationError(
                `Customer with key "${condition.hash}" is missing and cannot be removed from Customers collection`)
        }

        const orders = new OrderModel();
        const ordersData = await orders.find({ uid: userData._id });
        if (ordersData) {
            const products = new ProdModel();
            for (let i = 0; i < ordersData.length; i++) {
                const order = ordersData[i];
                const newProdData = await products.setTotalById(
                    String(order.pid._id),
                    order.pid.total + order.count
                );
                if (!newProdData) {
                    throw new ServerError('Failed to update the Products collection data. Operation aborted');
                }
                await orders.removeByHash({ hash: order.hash })
            }
        }

        const data = await this.models.customers.removeByHash(condition);

        return data;
    }

}
