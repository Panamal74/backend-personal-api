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
        const data = await orders.find()
            .populate({
                path: 'uid',
                select: 'name phones -_id'
            })
            .populate({
                path: 'pid',
                select: 'title price discount -_id'
            })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async findOrdersByCustomerId(id) {
        const data = await orders
            .find({ uid: id })
            .select('pid count -_id')
            .lean();

        return data;
    }

    async findByHash(hash) {
        const data = await orders.findOne({ hash })
            .populate({
                path: 'uid',
                select: 'fullName name phones'
            })
            .populate({
                path: 'pid',
                select: 'title price discount'
            })
            .select('-_id -__v')
            .lean();

        return data;
    }

    async removeByHash(hash) {
        const data = await orders.findOneAndRemove({ hash });

        return data;
    }

    async replaceByHash(hash) {
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
            { hash },
            parameters,
            options)
            .populate({
                path: 'uid',
                select: 'name phones -_id'
            })
            .populate({
                path: 'pid',
                select: 'title price discount -_id'
            })
            .select('-_id -__v')
            .lean();

        return data;

    }

}
