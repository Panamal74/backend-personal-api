// Core
import mongoose from 'mongoose';

// Document shape
import { users } from './users';

// Collection
export const staff = users.discriminator(
    'staff',
    new mongoose.Schema({
        role: {
            type:     String,
            required: true,
        },
        disabled: {
            type:    Boolean,
            default: false,
        },
    }),
);
