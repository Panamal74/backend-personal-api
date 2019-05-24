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
        city: {
            type: 'string',
        },
        country: {
            type: 'string',
        },
        password: {
            type:    'string',
            pattern: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}',
        },
    },
    required: [ 'name', 'email', 'phone', 'password' ],
};
