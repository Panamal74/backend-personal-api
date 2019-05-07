export default {
    type:       'object',
    properties: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        role: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    required: [ 'name', 'email', 'phone', 'role', 'password' ],

    // additionalProperties: false,
};