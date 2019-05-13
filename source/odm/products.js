// Core
import mongoose from 'mongoose';
import { addHashPlugin } from "../helpers/plugins";

// Document shape
const schema = new mongoose.Schema(
    {
        title: {
            type:     String,
            required: true,
        },
        description: String,
        price: {
            type:     Number,
            required: true,
            min:      0,
        },
        discount: {
            type: Number,
            min:  0,
            max:  50,
        },
        total: {
            type:     Number,
            min:      0,
            required: true,
        },
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
export const products = mongoose.model('products', schema);