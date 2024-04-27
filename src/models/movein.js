import { Schema } from "mongoose";
import mongoose from "mongoose";

const monveInSchema = Schema({
  date: { type: Date, default: Date.now, required: true },
  organization: { type: Schema.Types.ObjectId,ref:"Organization" , required: true },
  party: { type: Schema.Types.ObjectId, required: true, ref: "Party"},
  category: { type: String, required: true },
  Weight: { type: Number },
  rate:{type:Number,required:true},
  rent:{type:Number,required:true},
  rentStatus:{type:Boolean,default:false},
  lotNumber: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  remainingQuantity: { type: Number, required: true },
  location: { type: String },
  remarks: { type: String },
  additionalCharges: { type: Number, default: 0 },
});

const MoveIn = mongoose.model("MoveIn", monveInSchema);

export default MoveIn;
