// Core
import bcrypt from 'bcrypt';

// Instruments
import { customers } from '../odm';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { name, email, phone, city = null, country = null, password } = this.data;

        const hashedPassword = await bcrypt.hash(password, 11);

        const newCustomer = {
            fullName: name,
            password: hashedPassword,
            emails:   [{ email, primary: true }],
            phones:   [{ phone, primary: true }],
        };

        if (city) {
            newCustomer.city = city;
        }

        if (country) {
            newCustomer.country = country;
        }

        const { hash } = await customers.create(newCustomer);

        return { hash };
    }

    async find() {
        const data = await customers.find().lean();

        return data;
    }

    async findById(id) {
        const data = await customers.findById(id).lean();

        return data;
    }

    async findByHash(condition) {
        const data = await customers.findOne(condition).lean();

        return data;
    }

    async replaceByHash(condition) {
        const {
            name = null,
            emails = null,
            phones = null,
            city = null,
            country = null,
        } = this.data;
        const _set = {};
        const options = { new: true };

        if (name) {
            _set.name = {
                first: name.first,
                last:  name.last,
            };
        }
        if (emails) {
            _set.emails = emails;
        }
        if (phones) {
            _set.phones = phones;
        }
        if (city) {
            _set.city = city;
        }
        if (country) {
            _set.country = country;
        }

        const data = await customers.findOneAndUpdate(
            condition,
            { $set: _set },
            options,
        ).lean();

        return data;
    }

    async removeByHash(condition) {
        const data = await customers.findOneAndDelete(condition);

        return data;
    }
}
