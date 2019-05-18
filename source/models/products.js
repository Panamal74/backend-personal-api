// Instruments
import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { title, description, price, discount, total = 0 } = this.data;

        const { hash } = await products.create({
            title,
            description,
            price,
            discount,
            total
        });

        return { hash };
    }

    async find() {
        const data = await products.find().lean();

        return data;
    }

    async findById(id) {
        const data = await products.findById(id).lean();

        return data;
    }

    async setTotalById(id, total) {
        const data = await products
            .findByIdAndUpdate(
                id,
                { $set: { total }},
                { new: true })
            .lean();

        return data;
    }

    async findByHash(condition) {
        const data = await products.findOne(condition).lean();

        return data;
    }

    async removeByHash(condition) {
        const data = await products.findOneAndDelete(condition);

        return data;
    }

    async replaceByHash(condition) {
        const newProduct = this.data;
        const _set = {};
        const options = { new: true };

        if (newProduct.title) {
            _set["title"] = newProduct.title;
        }
        if (newProduct.description) {
            _set["description"] = newProduct.description;
        }
        if (newProduct.price) {
            _set["price"] = newProduct.price;
        }
        if (newProduct.discount) {
            _set["discount"] = newProduct.discount;
        }
        if (newProduct.total) {
            _set["total"] = newProduct.total;
        }

        const data = await products.findOneAndUpdate(
            condition,
            { $set: _set },
            options
        ).lean();

        return data;

    }

}
