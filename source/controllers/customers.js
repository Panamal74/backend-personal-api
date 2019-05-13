import {
    Customers as CustomersModel,
    Orders as OrdersModel,
    Products as ProductsModel
} from '../models';
import {ValidationError} from "../helpers/errors";

export class Customers {
    constructor(data) {
        this.models = {
            customers: new CustomersModel(data),
        };
        this.getAllOrdersCost = this._getAllOrdersCost.bind(this);
    }

    async _transformData(data) {
        if (Array.isArray(data)) {
            const returnData = [];
            for (let i = 0; i < data.length; i++) {
                const item = await this._transformItem(data[i]);
                returnData.push(item);
            }
            return returnData;
        }

        return data;
    }

    async _transformItem(data) {
        if (data) {
            const { name, phones, emails, _id } = data;

            return {
                name,
                phones: phones.map(({ phone, primary }) => {
                    return { phone, primary }
                }),
                emails: emails.map(({ email, primary }) => {
                    return { email, primary }
                }),
                score: await this.getAllOrdersCost(_id)
            };
        }

        return data;
    }

    async _getAllOrdersCost(userId) {
        const orders = new OrdersModel();
        const userOrders = await orders.findOrdersByCustomerId(userId);
        let cost = 0;

        if (userOrders.length > 0) {
            for (let i = 0; i < userOrders.length; i++) {
                const item = userOrders[i];
                cost += await this._getProductCost(item.pid, item.count)
            }
        }

        return cost;
    }

    async _getProductCost(productId, productCount) {
        const products = new ProductsModel();
        const prodData = await products.findById(productId);
        if (prodData) {
            const { discount, price } = prodData;
            const discountValue = (price * discount) / 100;
            const oneProduct = price - discountValue;

            return oneProduct * productCount;
        } else {
            return 0
        }
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
        const returnData = await this._transformData(data);

        return returnData;
    }

    async findByHash(hash) {
        const data = await this.models.customers.findByHash(hash);
        const returnData = await this._transformItem(data);

        return returnData;
    }

    async replaceByHash(hash) {
        const user = this.models.customers.data;

        if (user.emails || user.phones) {
            const {
                emails: oldEmails,
                phones: oldPhones
            } = await this.models.customers.findByHash(hash);

            if (user.emails) {
                this.models.customers.data.emails = await this._getArray(oldEmails, user.emails, 'email');
            }

            if (user.phones) {
                this.models.customers.data.phones = await this._getArray(oldPhones, user.phones, 'phone');
            }
        }

        const data = await this.models.customers.replaceByHash(hash);

        return data;
    }

    async removeByHash(hash) {
        const data = await this.models.customers.removeByHash(hash);

        return data;
    }

}
