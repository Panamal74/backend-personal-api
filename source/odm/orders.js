// Core
import mongoose from 'mongoose';
import { addHashPlugin } from "../helpers/plugins";

// Document shape
const schema = new mongoose.Schema(
    {
        uid: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'customers',
        },
        pid: {
            type:     mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:      'products',
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

schema.plugin(addHashPlugin, { version: 'v4' });

// Collection
export const orders = mongoose.model('orders', schema);