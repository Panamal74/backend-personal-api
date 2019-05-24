import { Staff as StaffModel } from '../models';
import { getStaffs } from '../helpers';

export class Staff {
    constructor(data) {
        this.models = {
            staff: new StaffModel(data),
        };
    }

    async create() {
        const data = await this.models.staff.create();

        return data;
    }

    async find() {
        const data = await this.models.staff.find();

        return getStaffs(data);
    }
}
