// Core
import mongoose from 'mongoose';
import { addHashPlugin } from "../helpers/plugins";

// Document shape
const schema = new mongoose.Schema(
    {
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
        fullName: {
            type: String,
            virtual: true,
            get() {
                return `${this.name.first} ${this.name.last}`;
            },
            set(value) {
                const [first, last] = value.split(' ');
                this.name.first = first;
                this.name.last = last;
            }
        },
        emails:      [
            {
                email: {
                    type:   String,
                    match:  /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
                    unique: true
                },
                primary: {
                    type: Boolean,
                    default: false,
                },
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
        password: {
            type:     String,
            required: true,
            select:   false,
        },
    },
    {
        timestamps: {
            createdAt: 'created',
            updatedAt: 'modified',
        },
        toObject: { virtuals: true }
    },
);

schema.plugin(addHashPlugin, { version: 'v4' });

schema.index({ 'name.first': 1, 'name.last': 1 });
schema.index({ fullName: 'text' });

// Collection
export const users = mongoose.model('users', schema);