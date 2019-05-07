export default {
    type:       'object',
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        price: {
            type: 'number',
            exclusiveMinimum: 0,
        },
        discount: {
            type: 'number',
            minimum: 0,
            maximum: 50,
        },
        total: {
            type: 'number',
            minimum: 0,
        },
    },
    required: [ 'title', 'price', 'discount', 'total' ],

    // additionalProperties: false,
};