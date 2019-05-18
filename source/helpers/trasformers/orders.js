function _getOrger(order) {
    const { uid, pid, count, comment = '' } = order;
    const data = {};
    data[uid.name ? 'customer' : 'uid'] = {};
    data[pid.title ? 'product' : 'pid'] = {};
    data['count'] = count;
    data['comment'] = comment;

    if (data.hasOwnProperty('customer')) {
        data.customer["name"] = `${uid.name.first} ${uid.name.last}`;
        data.customer["phones"] = uid.phones.map(item => {
            return {
                phone: item.phone,
                primary: item.primary
            };
        })
    } else {
        data.uid = uid;
    }

    if (data.hasOwnProperty('product')) {
        data.product["title"] = pid.title;
        data.product["price"] = pid.price;
        data.product["discount"] = pid.discount;
    } else {
        data.pid = pid;
    }

    return data;
}
export const getOrder = (order) => {
    if (order) {
        return _getOrger(order)
    } else {
        return order;
    }
};

export const getOrders = (orders) => {
    if (orders || orders.length > 0) {
        return orders.map((order) => {
            return _getOrger(order)
        });
    } else {
        return orders;
    }
};