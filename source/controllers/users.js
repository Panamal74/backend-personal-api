import { Users as UserModel } from '../models/index';

export class Users {
    constructor(data) {
        this.models = {
            users: new UserModel(data),
        };
    }

    async login() {
        const data = await this.models.users.login();

        return data;
    }
}
