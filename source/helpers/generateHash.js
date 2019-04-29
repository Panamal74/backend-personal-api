'use strict';

const uuid = require('uuid');

module.exports = (schema, options) => {
    const { version } = options;
    const isValid = ['v1', 'v3', 'v4', 'v5'].some(item => item === version);

    if (!isValid) {
        throw new Error('Not valid uuid version');
    }

    schema.pre('save', function(next) {
        this.hash = uuid[version]();
        next();
    });
};