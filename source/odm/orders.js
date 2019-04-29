// Core
import mongoose from 'mongoose';
import hashGeneratePlugin from '../helpers/generateHash';

import { customers, products } from  './index';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            index:    true,
            required: true,
            unique:   true,
        },
        uid: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'customers',
            validate: {
                validator(value) {
                    return customers.findById(value).lean();
                },
                message(props) {
                    const { value } = props;
                    return `Customer with ID '${value}' does not exist in customers collection`;
                },
            },
        },
        pid: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'products',
            validate: {
                validator(value) {
                    return products.findById(value).lean();
                },
                message(props) {
                    const { value } = props;
                    return `Product with ID '${value}' does not exist in products collection`;
                },
            },
        },
        count: {
            type:     Number,
            required: true,
        },
        comment: String,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.plugin(hashGeneratePlugin, { version: 'v4' });

// Collection
export const orders = mongoose.model('orders', schema);