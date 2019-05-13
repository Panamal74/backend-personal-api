// Core
import bcrypt from 'bcrypt';

// Instruments
import { customers } from '../odm';

export class Customers {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { name, email, phone, city, country, password } = this.data;

        const hashedPassword = await bcrypt.hash(password, 11);

        const newCustomer = {
            fullName: name,
            password: hashedPassword,
            emails: [{ email, primary: true }],
            phones: [{ phone, primary: true }],
            city,
            country,
        };

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

    async findByHash(hash) {
        const data = await customers.findOne({ hash }).lean();

        return data;
    }

    async replaceByHash(hash) {
        const { name, emails, phones, city, country } = this.data;
        const parameters = { $set: {}};
        const options = { new: true };

        if (name) {
            parameters["$set"]["name"] = {
                first: name.first,
                last: name.last
            };
        }
        if (emails) {
            parameters["$set"]["emails"] = emails;
        }
        if (phones) {
            parameters["$set"]["phones"] = phones;
        }
        if (city) {
            parameters["$set"]["city"] = city;
        }
        if (country) {
            parameters["$set"]["country"] = country;
        }

        const data = await customers.findOneAndUpdate(
            { hash },
            parameters,
            options
        ).lean();

        return data;

    }

    async removeByHash(hash) {
        const data = await customers.findOneAndRemove({ hash });

        return data;
    }

}
