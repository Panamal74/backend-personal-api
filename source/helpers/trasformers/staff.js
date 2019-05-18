function _getStaff(user) {
    if (user) {
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
    } else {
        return user;
    }
}

export const getStaff = (staff) => {
    if (staff) {
        return _getStaff(staff)
    } else {
        return staff;
    }
};

export const getStaffs = (staffs) => {
    if (staffs || staffs.length > 0) {
        return staffs.map((staff) => {
            return _getStaff(staff)
        });
    } else {
        return staffs;
    }
};