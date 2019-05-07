import { Customers as CustomersModel } from '../models';

export class Customers {
    constructor(data) {
        this.models = {
            customers: new CustomersModel(data),
        };
    }

    async create() {
        const data = await this.models.customers.create();

        return data;
    }

    async find() {
        const data = await this.models.customers.find();

        return data;
    }

    async findByHash(params) {
        const data = await this.models.customers.findByHash(params);

        return data;
    }

    async replaceByHash(params) {
        const data = await this.models.customers.replaceByHash(params);

        return data;
    }

    async removeByHash(params) {
        const data = await this.models.customers.removeByHash(params);

        return data;
    }

}
