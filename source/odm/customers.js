// Core
import mongoose from 'mongoose';

// Document shape
import { User } from './users';

// Collection
export const customers = User.discriminator(
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