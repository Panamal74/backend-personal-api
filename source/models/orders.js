// Instruments
import { orders } from '../odm';

export class Orders {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { uid, pid, count, comment } = this.data;

        const { hash } = await orders.create({
            uid,
            pid,
            count,
            comment
        });

        return { hash };
    }

    async find(condition = {}) {
        const data = await orders
            .find(condition)
            .select('-_id -__v');

        return data;
    }

    async findByHash(condition = {}) {
        const data = await orders
            .findOne(condition)
            .select('-_id -__v');

        return data;
    }

    async removeByHash(condition = {}) {
        const data = await orders.findOneAndDelete(condition);

        return data;
    }

    async replaceByHash(condition = {}) {
        const { uid, pid, count, comment } = this.data;
        const parameters = { $set: {}};
        const options = { new: true };

        if (uid) {
            parameters["$set"]["uid"] = uid;
        }
        if (pid) {
            parameters["$set"]["pid"] = pid;
        }
        if (count) {
            parameters["$set"]["count"] = count;
        }
        if (comment) {
            parameters["$set"]["comment"] = comment;
        }

        const data = await orders
            .findOneAndUpdate(
                condition,
                parameters,
                options)
            .select('-_id -__v');

        return data;

    }

}
