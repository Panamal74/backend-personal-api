// Core
import bcrypt from 'bcrypt';

// Instruments
import { users } from '../odm';
import {NotFoundError, ValidationError} from '../helpers/errors';

export class Users {
    constructor(data) {
        this.data = data;
    }

    async login() {
        const { email, password } = this.data;
        const userData = await users
            .findOne({ 'emails.email': email })
            .select('hash __t password')
            .lean();

        if (!userData) {
            throw new NotFoundError('User not found', 401);
        }

        const { hash, __t: role, password: userPassword } = userData;
        const match = await bcrypt.compare(password, userPassword);

        if (!match) {
            throw new ValidationError('Credentials are not valid', 401);
        }

        return {hash, role};
    }
}
