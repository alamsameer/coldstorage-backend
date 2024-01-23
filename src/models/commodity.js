import { Schema } from "mongoose";

const commoditySchema = Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rate: { type: Number, required: true },
    months: { type: Number, required: true },
    calculateBy: { type: String, enum: ['Seasonally/Packet', 'Seasonally/quintal','Monthly/Packet','Monthly/quintal'], required: true },
    });