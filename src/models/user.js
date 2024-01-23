import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = Schema({
    username: { type: String, required: true, unique: true },
    email:{type:String},
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  });

const User = mongoose.model('User', userSchema);

export default User