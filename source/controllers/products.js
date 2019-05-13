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

    async findByHash(hash) {
        const data = await this.models.products.findByHash(hash);

        return data;
    }

    async replaceByHash(hash) {
        const data = await this.models.products.replaceByHash(hash);

        return data;
    }

    async removeByHash(hash) {
        const data = await this.models.products.removeByHash(hash);

        return data;
    }


}
