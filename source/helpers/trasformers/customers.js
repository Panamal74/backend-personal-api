import { Orders } from "../../models";

const orders = new Orders();

async function _getCustomer(user) {
    if (user) {
        let score = 0;
        const userId = user._id;
        const userOrders = await orders.find({ uid: userId });
        if (userOrders.length > 0) {
            for (let i = 0; i < userOrders.length; i++) {
                const count = userOrders[i].count;
                const { price, discount } = userOrders[i].pid;
                const discountValue = price * discount / 100;
                const oneProduct = price - discountValue;
                score += oneProduct * count;
            }
        }

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
            score
        };
    } else {
        return user;
    }
}

export const getCustomer = async (customer) => {
    if (customer) {
        const returnValue = await _getCustomer(customer);
        return returnValue;
    } else {
        return customer;
    }
};

export const getCustomers = async (customers) => {
    if (customers || customers.length > 0) {
        const returnArray = [];
        for (let i = 0; i < customers.length; i++) {
            const returnItem = await _getCustomer(customers[i]);
            returnArray.push(returnItem);
        }

        return returnArray;
    } else {
        return customers;
    }
};