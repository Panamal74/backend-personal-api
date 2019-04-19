// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({});

// Collection
export const users = mongoose.model('staff', schema);
