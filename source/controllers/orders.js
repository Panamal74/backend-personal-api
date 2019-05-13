import {
    Orders as OrdersModel,
    Products as ProdModel,
    Customers as UserModel
} from '../models';

import { ValidationError } from "../helpers/errors";

const customers = new UserModel();
const products = new ProdModel();

export class Orders {
    constructor(data) {
        this.models = {
            orders: new OrdersModel(data),
        };
    }

    async create() {
        const order = this.models.orders.data;

        const userData = await customers.findById(order.uid);
        if (!userData) { // exist error
            throw new ValidationError(`Customer with ID '${order.uid}' does not exist in customers collection`)
        }

        const prodData = await products.findById(order.pid);
        if (!prodData) { // exist error
            throw new ValidationError(`Product with ID '${order.pid}' does not exist in products collection`)
        }
        if (prodData.total - order.count < 0) {
            throw new ValidationError(`The requested quantity of ${prodData.title} (${order.count} units) is misses`);
        }

        const newProduct = new ProdModel();
        const updateProduct = await newProduct.setTotalById(
            order.pid,
            prodData.total - order.count
        );

        if (updateProduct) {
            const data = await this.models.orders.create();

            return data;
        } else {
            throw new Error('Failed to update the Products collection data. Operation aborted');
        }

    }

    async find() {
        const data = await this.models.orders.find();

        return data;
    }

    async findByHash(hash) {
        const data = await this.models.orders.findByHash(hash);

        return data;
    }

    async replaceByHash(hash) {
        const order = this.models.orders.data;

        const oldOrder = await this.models.orders.findByHash(hash);
        if (!oldOrder) { // order not found error
            throw new ValidationError(`Requested order with key "${hash}" not found`);
        }

        if (order.hasOwnProperty('uid') && order.uid !== String(oldOrder.uid._id)) { // user changed
            const userData = await customers.findById(order.uid);
            if (!userData) { // exist error
                throw new ValidationError(`Customer with ID '${order.uid}' does not exist in customers collection`)
            }
        }

        if (order.hasOwnProperty('pid') && order.pid !== String(oldOrder.pid._id)) { // product changed
            const prodData = await products.findById(order.pid);
            if (!prodData) { // exist error
                throw new ValidationError(`Product with ID '${order.pid}' does not exist in products collection`)
            }
            const count = order.hasOwnProperty('count') ? order.count : oldOrder.count;
            if (prodData.total - count < 0) {
                throw new ValidationError(`The requested quantity of ${prodData.title} (${order.count} units) is misses`);
            }
            const oldProdId = String(oldOrder.pid._id);
            const { total: oldProdTotal } = await products.findById(oldProdId);

            // вот тут и не хватает транзакций!!!
            const oldProdData = await products.setTotalById(
                oldProdId,
                oldProdTotal + oldOrder.count
            );
            // вернули старому продукту заказанное ранее кол-во товара
            if (!oldProdData) {
                throw new Error('Failed to update the Products collection data. Operation aborted');
            }

            const newProdData = await products.setTotalById(order.pid, prodData.total - count);
            // установили новому продукту изменённое кол-во товара
            if (!newProdData) {
                throw new Error('Failed to update the Products collection data. Operation aborted');
            }
        } else { // product not changed
            const productId = String(oldOrder.pid._id);
            if (order.hasOwnProperty('count')) {
                const difference = order.count - oldOrder.count;
                const prodData = await products.findById(productId);
                if (prodData.total - difference < 0) {
                    throw new ValidationError(`The requested quantity of ${prodData.title} (${order.count} units) is misses`);
                }
                const newProdData = await products.setTotalById(
                    productId,
                    prodData.total - difference
                );
                // установили старому продукту изменённое кол-во товара
                if (!newProdData) {
                    throw new Error('Failed to update the Products collection data. Operation aborted');
                }
            }
        }

        const data = await this.models.orders.replaceByHash(hash);

        return data;
    }

    async removeByHash(hash) {
        const data = await this.models.orders.removeByHash(hash);

        return data;
    }

}
