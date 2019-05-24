function _getProduct(product) {
    const { title, description, price, discount } = product;

    return {
        title,
        description,
        price,
        discount,
    };
}

export const getProduct = (product) => {
    if (product) {
        return _getProduct(product);
    }

    return product;
};

export const getProducts = (products) => {
    if (products || products.length > 0) {
        return products.map((product) => {
            return _getProduct(product);
        });
    }

    return products;
};
