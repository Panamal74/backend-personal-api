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
            comment,
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
        const _set = {};
        const options = { new: true };

        if (uid) {
            _set.uid = uid;
        }
        if (pid) {
            _set.pid = pid;
        }
        if (count) {
            _set.count = count;
        }
        if (comment) {
            _set.comment = comment;
        }

        const data = await orders
            .findOneAndUpdate(condition, { $set: _set }, options)
            .select('-_id -__v');

        return data;
    }
}
