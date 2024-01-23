import { Schema } from "mongoose";
import mongoose from "mongoose";

const partySchema = Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Trader', 'Farmer'], required: true },
    address: { type: String, },
    contact: { type: Number, required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  });

const Party = mongoose.model('Party', partySchema);

 export default Party;
