import {
    Products as ProdModel,
    Orders as OrderModel,
} from '../models';
import {
    getProduct,
    getProducts,
    ValidationError
} from "../helpers";

export class Products {
    constructor(data) {
        this.models = {
            products: new ProdModel(data),
        };
    }

    async create() {
        const data = await this.models.products.create();

        return data;
    }

    async find() {
        const data = await this.models.products.find();

        return getProducts(data);
    }

    async findByHash(condition) {
        const data = await this.models.products.findByHash(condition);

        return getProduct(data);
    }

    async replaceByHash(condition) {
        const data = await this.models.products.replaceByHash(condition);

        return getProduct(data);
    }

    async removeByHash(condition) {
        let data = await this.models.products.findByHash(condition);
        if (!data) {
            throw new ValidationError(
                `The product with the key "${condition.hash}" is missing and cannot be removed from the Products collection`)
        }

        const prodId = data._id;
        const orders = new OrderModel();
        data = await orders.find({ pid: prodId });
        if (data.length > 0) {
            throw new ValidationError(`You can not remove a product because it is present in orders`)
        }

        data = await this.models.products.removeByHash(condition);

        return data;
    }

}
