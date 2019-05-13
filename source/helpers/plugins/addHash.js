import uuid from 'uuid';

export const addHashPlugin = (schema, options) => {
    const { version } = options;
    const isValid = ['v1', 'v3', 'v4', 'v5'].some(item => item === version);

    if (!isValid) {
        throw new Error('Not valid uuid version');
    }

    schema.add({
        hash: {
            type:     String,
            required: true,
            unique:   true,
            default: function() {
                return uuid[version]();
            },
        }
    });

};