import { Schema } from "mongoose";
import mongoose from "mongoose";
const organizationSchema = Schema({
    name: { type: String, required: true },
    email:{type:String,required:true},
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;

