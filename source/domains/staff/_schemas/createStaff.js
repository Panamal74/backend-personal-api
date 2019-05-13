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
            pattern: '(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{8,}',
            // кастомное сообщение не подтягивается :(
            // message: {
            //     pattern: '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
            // }
        },
    },
    required: [ 'name', 'email', 'phone', 'role', 'password' ],

    // additionalProperties: false,
};