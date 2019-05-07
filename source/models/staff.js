// Core
import bcrypt from 'bcrypt';

// Instruments
import { staff } from '../odm';

export class Staff {
    constructor(data) {
        this.data = data;
    }

    async create() {
        const { name, email, phone, role, password } = this.data;

        if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}/g.test(password)) {
            throw new Error('Password must be at least 8 characters and include numbers, symbols, capital and small letters');
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const newStaff = {
            fullName: name,
            password: hashedPassword,
            role,
        };
        if (email) {
            newStaff['emails'] = [{ email, primary: true }]
        }
        if (phone) {
            newStaff['phones'] = [{ phone, primary: true }]
        }

        const { hash } = await staff.create(newStaff);

        return { hash };
    }

    async find() {
        const data = await staff.find().lean();

        return data;
    }
}
