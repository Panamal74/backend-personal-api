// Core
import bcrypt from 'bcrypt';
import v4 from 'uuid/v4';

// Instruments
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this.data;
        const { hash, password: userPassword } = await staff
            .findOne({ email })
            .select('password hash')
            .lean();

        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new Error('Credentials are not valid');
        }

        return hash;
    }

    async create() {
        const { name, password, emails = {}, phones = {}, role } = this.data;

        const data = await staff.create({
            hash: v4(),
            name,
            password,
            emails,
            phones,
            role,
        });

        return data;
    }

}
