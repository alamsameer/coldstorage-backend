import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Organization from "../models/organization.js";
import Commodity from "../models/commodity.js";
import MoveIn from "../models/movein.js";

export const adminSignup = async (req, res) => {
    try {
        const {username, email, password, organization} = req.body;
        if (!username || !email || !password || !organization) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organizationExist = await Organization.findOne({ _id:organization });
        if (!organizationExist) {
            return res.status(400).json({ error: "Organization does not exists" });
        }
        const user = await User.create({ username, email, password, organization, role: "admin" });
        organizationExist.admins.push(user._id);
        organizationExist.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const adminSignin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (user.role !== "admin") {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const organization=user.organization;
        const token = jwt.sign({ _id: user._id,role:"admin",organization}, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const adminAddCommodity = async (req, res) => {
    try {
        const { name, category, rate, months, calculateBy } = req.body;
        if (!name || !category || !rate || !months || !calculateBy) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organization = req.user.organization;
        const commodity = await Commodity.create({ name, category, rate, months, calculateBy, organization });
        res.status(201).json({ message: "Commodity added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const adminGetCommodities = async (req, res) => {

    try {
        const organization = req.user.organization;
        const commodities = await Commodity.find({ organization });
        res.status(200).json({ commodities });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }

}

export const adminAddParty = async (req, res) => {
    try {
        const { name, contact, address } = req.body;
        if (!name || !contact || !address) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organization = req.user.organization;
        const party = await Party.create({ name, contact, address, organization,account});
        res.status(201).json({ message: "Party added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}



export  const employeeSignup = async (req, res) => {
    try {
        const {  username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const organization = req.user.organization;
        const organizationExist = await Organization.findOne({ _id:organization });
        if (!organizationExist) {
            return res.status(400).json({ error: "Organization does not exists" });
        }
        const user = await User.create({username, password, organization, role: "employee" });
        console.log({user:user._id});
        organizationExist.employees.push(user._id);
        organizationExist.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
export  const employeeSignin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password ) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const user = await User.findOne({ username});
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (user.role !== "employee") {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const organization=user.organization;
        const token = jwt.sign({ _id: user._id,role:"employee",organization}, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    } 
}

