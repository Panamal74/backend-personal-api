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

        if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(password)) {
            throw new Error('Password must be at least 8 characters and include numbers, symbols, capital and small letters');
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const newCustomer = {
            fullName: name,
            password: hashedPassword,
            city,
            country,
        };
        if (email) {
            newCustomer['emails'] = [{ email, primary: true }]
        }
        if (phone) {
            newCustomer['phones'] = [{ phone, primary: true }]
        }

        const { hash } = await customers.create(newCustomer);

        return { hash };
    }

    async find() {
        const data = await customers.find().lean();

        return data;
    }

    async findById(condition) {
        const data = await customers.findById(condition).lean();

        return data;
    }

    async findByHash(condition) {
        const data = await customers.findOne(condition).lean();

        return data;
    }

    async replaceByHash(condition) {
        const { name, emails, phones, city, country } = this.data;
        const parameters = { $set: {}};
        const options = { returnOriginal: false };

        if (name) {
            parameters["$set"]["name.first"] = name.first;
            parameters["$set"]["name.last"] = name.last;
        }
        if (city) {
            parameters["$set"]["city"] = city;
        }
        if (country) {
            parameters["$set"]["country"] = country;
        }

        if (emails || phones) {
            const {
                emails: oldEmails,
                phones: oldPhones
            } = await customers.findOne(condition).lean();

            if (emails) {
                const remEmails = await emails
                    .filter(item => item.action === "remove")
                    .map(item => { return item.email });

                const addEmails = await emails
                    .filter(item => item.action === "add")
                    .map(item => { return item.email });

                const newEmails = await oldEmails
                    .filter(item => remEmails.indexOf(item.email) === -1)
                    .map(item => { return item.email });

                await addEmails.forEach(item => {
                    if (newEmails.indexOf(item) === -1) {
                        newEmails.push(item)
                    }
                });

                if (newEmails.length > 0) {
                    parameters["$set"]["emails"] = await newEmails.map((item, index) => {
                        if (index === 0) {
                            return {email: item, primary: true}
                        }
                        return { email: item }
                    });
                } else {
                    throw new Error("Cannot delete all email addresses. There must be at least one address.")
                }
            }

            if (phones) {
                const remPhones = await phones
                    .filter(item => item.action === "remove")
                    .map(item => { return item.phone });

                const addPhones = await phones
                    .filter(item => item.action === "add")
                    .map(item => { return item.phone });

                const newPhones = await oldPhones
                    .filter(item => remPhones.indexOf(item.phone) === -1)
                    .map(item => { return item.phone });

                await addPhones.forEach(item => {
                    if (newPhones.indexOf(item) === -1) {
                        newPhones.push(item)
                    }
                });

                if (newPhones.length > 0) {
                    parameters["$set"]["phones"] = await newPhones.map((item, index) => {
                        if (index === 0) {
                            return {phone: item, primary: true}
                        }
                        return { phone: item }
                    });
                } else {
                    throw new Error("Cannot delete all phones. There must be at least one phone.")
                }
            }
        }

        const data = await customers.findOneAndUpdate(
            condition,
            parameters,
            options
        ).lean();

        return data;

    }

    async removeByHash(condition) {
        const data = await customers.findOneAndRemove(condition);

        return data;
    }

}
