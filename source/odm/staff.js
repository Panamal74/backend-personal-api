// Core
import mongoose from 'mongoose';

// Document shape
import { User } from './users';

// Collection
export const staff = User.discriminator(
    'staff',
    new mongoose.Schema({
        role: {
            type:     String,
            required: true,
        },
        disabled: Boolean,
    }),
);
