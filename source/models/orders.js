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

    async find() {
        const data = await orders
            .find()
            // .populate({ path: 'uid', select: 'fullName phones -_id' })
            .populate({ path: 'uid', select: 'name phones -_id' })
            .populate({ path: 'pid', select: 'title price discount -_id' })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async findByHash(condition) {
        const data = await orders
            .findOne(condition)
            // .populate({ path: 'uid', select: 'fullName phones -_id' })
            .populate({ path: 'uid', select: 'name phones -_id' })
            .populate({ path: 'pid', select: 'title price discount -_id' })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async removeByHash(condition) {
        const data = await orders.findOneAndRemove(condition);

        return data;
    }

    async replaceByHash(condition) {
        const { uid, pid, count, comment } = this.data;
        const parameters = { $set: {}};
        const options = { returnOriginal: false };

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

        const data = await orders.findOneAndUpdate(
            condition,
            parameters,
            options) // why dose not work this options?????
            .populate({ path: 'uid', select: 'name phones -_id' })
            .populate({ path: 'pid', select: 'title price discount -_id' })
            .select('-_id -__v')
            .lean();

        return data;

    }

}
