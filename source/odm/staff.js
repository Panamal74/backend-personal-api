// Core
import mongoose from 'mongoose';

// Document shape
const schema = new mongoose.Schema({});

// Collection
export const staff = mongoose.model('staff', schema);
