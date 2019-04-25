// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema(
    {
        hash: {
            type:     String,
            index:    true,
            required: true,
            unique:   true,
        },
        name: {
            first: {
                type:      String,
                minlength: 2,
                index:     true,
                required:  true,
            },
            last: {
                type:      String,
                minlength: 2,
                index:     true,
                required:  true,
            },
        },
        emails:      [
            {
                email: {
                    type:   String,
                    match:  /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
                    unique: true,
                },
                primary: Boolean,
            },
        ],
        phones: [
            {
                phone: {
                    type:  String,
                    match: /^\(\d{3,6}\)\s[\d\s]{5,9}$/,
                },
                primary: Boolean,
            },
        ],
        password: String,
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
    },
);

schema.index({ 'name.first': 1, 'name.last': 1 });
schema.index({ 'name.first': 'text', 'name.last': 'text' });

// Collection
export const User = mongoose.model('users', schema);