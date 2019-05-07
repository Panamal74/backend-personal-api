import {
    Orders as OrdersModel,
    Products as ProdModel,
    Customers as UserModel,
} from '../models';
import { ValidationError } from '../helpers/errors';

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async create() {
        const data = await this.models.orders.create();

        return data;
    }

    async find() {
        const data = await this.models.orders.find();

        return data;
    }

    async findByHash(condition) {
        const data = await this.models.orders.findByHash(condition);

        return data;
    }

    async replaceByHash(condition) {
        const { uid, pid, count } = this.models.orders.data;

        if (uid) {
            const customers = new UserModel();
            const userData = await customers.findById(uid);
            if (!userData) {
                throw new ValidationError(`Customer with ID '${uid}' does not exist in customers collection`)
            }
        }
        if (pid) {
            const products = new ProdModel();
            const prodData = await products.findById(pid);
            if (!prodData) {
                throw new ValidationError(`Product with ID '${pid}' does not exist in products collection`)
            }
            if (prodData.total && prodData.total - count < 0) {
                throw new ValidationError(`The requested number of product units (${count}) is missing`)
            }
        }
        if (count && count < 0) {
            throw new ValidationError('Count cannot be less than zero');
        }
        const data = await this.models.orders.replaceByHash(condition);

        return data;
    }

    async removeByHash(condition) {
        const data = await this.models.orders.removeByHash(condition);

        return data;
    }

}
