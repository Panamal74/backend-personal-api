import {
    Orders as OrdersModel,
    Products as ProdModel,
    Customers as UserModel
} from '../models';

import {
    ForbiddenError,
    ServerError,
    ValidationError,
    getOrder,
    getOrders,
    getOrderCondition
} from "../helpers";

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async create() {
        const order = this.models.orders.data;

        const customers = new UserModel();
        const userData = await customers.findById(order.uid);
        if (!userData) { // exist error
            throw new ValidationError(`Customer with ID '${order.uid}' does not exist in customers collection`)
        }

        const products = new ProdModel();
        const prodData = await products.findById(order.pid);
        if (!prodData) { // exist error
            throw new ValidationError(`Product with ID '${order.pid}' does not exist in products collection`)
        }
        if (prodData.total - order.count < 0) {
            throw new ValidationError(`The requested quantity of ${prodData.title} (${order.count} units) is misses`);
        }

        const updateProduct = await products.setTotalById(
            order.pid,
            prodData.total - order.count
        );

        if (updateProduct) {
            const hash = await this.models.orders.create();

            return hash;
        } else {
            throw new ServerError('Failed to update the Products collection data. Operation aborted');
        }
    }

    async find(cond) {
        const condition = await getOrderCondition(cond);
        const data = await this.models.orders.find(condition);

        return getOrders(data);
    }

    async findByHash(cond) {
        const condition = await getOrderCondition(cond);
        const data = await this.models.orders.findByHash(condition);

        return getOrder(data);
    }

    async replaceByHash(cond) {
        const condition = await getOrderCondition(cond);
        const order = this.models.orders.data;

        const oldOrder = await this.models.orders.findByHash(condition);
        if (!oldOrder) { // order not found error
            if (condition.hasOwnProperty('uid')) {
                throw new ValidationError(
                    `The requested order with the key "${condition.hash}" was not found at the authorized user`);
            } else {
                throw new ValidationError(`Requested order with key "${condition.hash}" not found`);
            }
        }

        if (order.hasOwnProperty('uid') && order.uid !== String(oldOrder.uid._id)) { // user changed
            if (condition.hasOwnProperty('uid')) {
                throw new ForbiddenError('Not enough rights to perform the operation', 401)
            }

            const customers = new UserModel();
            const userData = await customers.findById(order.uid);
            if (!userData) { // exist error
                throw new ValidationError(`Customer with ID '${order.uid}' does not exist in customers collection`)
            }
        }

        if (order.hasOwnProperty('pid') && order.pid !== String(oldOrder.pid._id)) { // product changed
            const products = new ProdModel();
            const prodData = await products.findById(order.pid);
            if (!prodData) { // exist error
                throw new ValidationError(`Product with ID '${order.pid}' does not exist in products collection`)
            }
            const count = order.hasOwnProperty('count') ? order.count : oldOrder.count;
            if (prodData.total - count < 0) {
                throw new ValidationError(`The requested quantity of ${prodData.title} (${order.count} units) is misses`);
            }

            // вот тут и не хватает транзакций!!!
            const oldProdData = await products.setTotalById(
                String(oldOrder.pid._id),
                oldOrder.pid.total + oldOrder.count
            );
            // вернули старому продукту заказанное ранее кол-во товара
            if (!oldProdData) {
                throw new ServerError('Failed to update the Products collection data. Operation aborted');
            }

            const newProdData = await products.setTotalById(order.pid, prodData.total - count);
            // установили новому продукту изменённое кол-во товара
            if (!newProdData) {
                throw new ServerError('Failed to update the Products collection data. Operation aborted');
            }
        } else { // product not changed
            const products = new ProdModel();
            if (order.hasOwnProperty('count')) {
                const difference = order.count - oldOrder.count;
                if (oldOrder.pid.total - difference < 0) {
                    throw new ValidationError(`The requested quantity of ${oldOrder.pid.title} (${order.count} units) is misses`);
                }
                const newProdData = await products.setTotalById(
                    String(oldOrder.pid._id),
                    oldOrder.pid.total - difference
                );
                // установили старому продукту изменённое кол-во товара
                if (!newProdData) {
                    throw new ServerError('Failed to update the Products collection data. Operation aborted');
                }
            }
        }

        const data = await this.models.orders.replaceByHash(condition);

        return getOrder(data);
    }

    async removeByHash(cond) {
        const condition = await getOrderCondition(cond);
        const order = await this.models.orders.findByHash(condition);
        if (!order) {
            if (condition.hasOwnProperty('uid')) {
                throw new ValidationError(
                    `The requested order with the key "${condition.hash}" was not found at the authorized user`);
            } else {
                throw new ValidationError(`Requested order with key "${condition.hash}" not found`);
            }
        }

        const products = new ProdModel();
        const newProdData = await products.setTotalById(
            String(order.pid._id),
            order.pid.total + order.count
        );

        if (!newProdData) {
            throw new ServerError('Failed to update the Products collection data. Operation aborted');
        }

        const data = await this.models.orders.removeByHash(condition);

        return data;
    }

}
