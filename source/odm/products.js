// Core
import mongoose from 'mongoose';
import hashGeneratePlugin from "../helpers/generateHash";

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            index:    true,
            required: true,
            unique:   true,
        },
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

schema.plugin(hashGeneratePlugin, { version: 'v4' });

// Collection
export const products = mongoose.model('products', schema);