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

        const hashedPassword = await bcrypt.hash(password, 11);

        const newStaff = {
            fullName: name,
            password: hashedPassword,
            emails: [{ email, primary: true }],
            phones: [{ phone, primary: true }],
            role,
        };

        const { hash } = await staff.create(newStaff);

        return { hash };
    }

    async find() {
        const data = await staff.find().lean();

        return data;
    }
}
