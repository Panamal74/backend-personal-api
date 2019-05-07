import { Products as ProdModel } from '../models';

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

        return data;
    }

    async findByHash(params) {
        const data = await this.models.products.findByHash(params);

        return data;
    }

    async replaceByHash(params) {
        const data = await this.models.products.replaceByHash(params);

        return data;
    }

    async removeByHash(params) {
        const data = await this.models.products.removeByHash(params);

        return data;
    }


}
