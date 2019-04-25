export default {
    type:       'object',
    properties: {
        name: {
            type:       'object',
            properties: {
                first: {
                    type:      'string',
                    minLength: 5,
                },
                last: {
                    type:      'string',
                    minLength: 5,
                },
            },
            required: [ 'first', 'last' ],
        },
        emails: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
        phones: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    phone: {
                        type: 'string',
                    },
                    primary: {
                        type: 'boolean',
                    },
                },
            },
        },
    },
    required: [ 'name' ],

    // additionalProperties: false,
};