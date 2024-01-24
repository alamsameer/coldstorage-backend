import mongoose,{Schema} from "mongoose";

const moveOutSchema= Schema({
moveInId: { type:Schema.Types.ObjectId, ref: 'MoveIn', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    party: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model("MoveOut", moveOutSchema);