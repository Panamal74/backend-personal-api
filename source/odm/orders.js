// Core
import mongoose from 'mongoose';
import autoPopulate from 'mongoose-autopopulate';
import { addHashPlugin } from "../helpers/plugins";

// Document shape
const schema = new mongoose.Schema(
    {
        uid: {
            type:     mongoose.SchemaTypes.ObjectId,
            ref:      'customers',
            required: true,
            autopopulate: true,
        },
        pid: {
            type:     mongoose.SchemaTypes.ObjectId,
            ref:      'products',
            required: true,
            autopopulate: true,
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

schema.plugin(autoPopulate);
schema.plugin(addHashPlugin, { version: 'v4' });

// Collection
export const orders = mongoose.model('orders', schema);