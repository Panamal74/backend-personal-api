import { Staff as StaffModel } from '../models';

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

        if (data.length > 0) {
            return data.map((user) => {
                return {
                    name: user.name,
                    phones: user.phones.map(value => { return {
                        phone: value.phone,
                        primary: value.primary
                    }}),
                    emails: user.emails.map(value => { return {
                        email: value.email,
                        primary: value.primary
                    }}),
                    role: user.role
                };
            });
        }

        return data;
    }

}
