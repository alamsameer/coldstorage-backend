import mongoose, { Schema } from "mongoose";

const commoditySchema = Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    rate: { type: Number, required: true },
    months: { type: Number, required: true },
    organization: { type: Schema.Types.ObjectId,ref:"Organization" ,required: true },
    calculateBy: { type: String, enum: ['Seasonally/Packet', 'Seasonally/quintal','Monthly/Packet','Monthly/quintal'], required: true },
    });
export default mongoose.model("Commodity", commoditySchema);