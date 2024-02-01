import mongoose from "mongoose";
import moveout from "../models/moveout.js";
import movein from "../models/movein.js";

export const handleMoveIn = async (req, res) => {
    const {date,party,category,Weight,rate,rent,rentStatus,lotNumber,quantity,location,remarks,additionalCharges} = req.body;
    console.log(req.body);
    try {
        if(!date || !party || !category  || !rate || !rent || !rentStatus || !lotNumber || !quantity  ){
            return res.status(400).json({ error: "All fields are required" });
        }
        // write validation for lot number to be uniQUE FOR  organisation
        const organization = req.user.organization;

        const remainingQuantity=quantity;
        const partyId=new mongoose.Types.ObjectId(party);
        console.log({partyId});
        const moveIn = await movein.create({date,organization,party:partyId,category,Weight,rate,rent,rentStatus,lotNumber,quantity,remainingQuantity,location,remarks,additionalCharges});
        res.status(201).json({message:"moved in", moveIn });
    } catch (error) {
        console.log(error);
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}

export const handleMoveOut = async (req, res) => {
    const { moveInId, quantity, date, party } = req.body;
    try {
        if (!moveInId || !quantity || !date || !party) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const organization = req.user.organization;
        const objmoveInId = new mongoose.Types.ObjectId(moveInId);
        const partyId = new mongoose.Types.ObjectId(party);

        // Use findOne to get a single document instead of find
        const getMoveIn = await movein.findOne({ organization, _id: objmoveInId });
        console.log({ getMoveIn });

        if (!getMoveIn) {
            return res.status(400).json({ error: "Move in not found" });
        }

        const remainingQuantity = getMoveIn.remainingQuantity;

        if (remainingQuantity < quantity) {
            return res.status(400).json({ error: "Quantity is more than remaining quantity" });
        }

        const newRemainingQuantity = remainingQuantity - quantity;

        // Update remainingQuantity field in the found document
        getMoveIn.remainingQuantity = newRemainingQuantity;

        // Use save() to persist changes to the document
        await getMoveIn.save();

        const moveOut = await moveout.create({ moveInId, quantity, date, party: partyId, organization });
        res.status(201).json({ moveOut });
    } catch (error) {
        console.log({ message: error.message });
        res.status(409).json({ message: "Something went wrong" });
    }
}
