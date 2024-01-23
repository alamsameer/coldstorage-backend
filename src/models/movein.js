import { Schema } from "mongoose";
import mongoose from "mongoose";

const monveInSchema = Schema({
  inwardDate: { type: Date, default: Date.now, required: true },
  party: { type: Schema.Types.ObjectId, required: true },
  commodity: { type: Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  totalWeight: { type: Number },
  lotNumber: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  location: { type: String },
  remarks: { type: String },
  additionalCharges: { type: Number, default: 0 },
});

const MoveIn = mongoose.model("MoveIn", monveInSchema);

module.exports = MoveIn;