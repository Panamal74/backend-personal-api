// Instruments
import { products } from '../odm';

export class Products {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { title, description, price, discount, total } = this.data;

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

    async findById(condition) {
        const data = await products.findById(condition).lean();

        return data;
    }

    async findByHash(condition) {
        const data = await products.findOne(condition).lean();

        return data;
    }

    async removeByHash(condition) {
        const data = await products.findOneAndRemove(condition);

        return data;
    }

    async replaceByHash(condition) {
        const { title, description, price, discount, total } = this.data;
        const parameters = { $set: {}};
        const options = { returnOriginal: false };

        if (title) {
            parameters["$set"]["title"] = title;
        }
        if (description) {
            parameters["$set"]["description"] = description;
        }
        if (price) {
            if (price < 0 || price === 0) {
                throw new Error('Cost cannot be less than or equal to zero');
            }
            parameters["$set"]["price"] = price;
        }
        if (discount) {
            if (discount < 0 || discount > 50) {
                throw new Error('Discount cannot be less than 0 or more than 50');
            }
            parameters["$set"]["discount"] = discount;
        }
        if (total) {
            if (total < 0) {
                throw new Error('Quantity can not be less than zero');
            }
            parameters["$set"]["total"] = total;
        }

        const data = await products.findOneAndUpdate(
            condition,
            parameters,
            options
        ).lean();

        return data;

    }

}
