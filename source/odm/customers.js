// Core
import mongoose from 'mongoose';

// Document shape
import { users } from './users';

// Collection
export const customers = users.discriminator(
    'customers',
    new mongoose.Schema({
        city: {
            type:  String,
            index: true,
        },
        country: {
            type:  String,
            index: true,
        },
    }),
);