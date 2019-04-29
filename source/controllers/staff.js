import { Staff as StaffModel } from '../models';

export class Staff {
    constructor(data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async login() {
        const data = await this.models.staff.login();

        return data;
    }

    async create() {
        const data = await this.models.staff.create();

        return data;
    }

}
