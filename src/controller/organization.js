import jwt from "jsonwebtoken";
import Organization from "../models/organization.js";


export const organizationSignup = async (req, res) => {
    try {
        const { name, email} = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organizationExist = await Organization.findOne({ email });
        if (organizationExist) {
            return res.status(400).json({ error: "Organization already exists" });
        }
        const organization = await  Organization.create({ name, email });
        res.status(201).json({ message: "Organization created successfully",organization});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const listOrganisation= async (req,res)=>{
    try{
        const allorg=await Organization.find();
        res.status(200).json({allorg})
    }catch(e){
        res.status(500).json({error:"Something went wrong"})
    }
}

