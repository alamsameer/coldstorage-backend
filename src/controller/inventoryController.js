import moveout from "../models/moveout.js";
import movein from "../models/movein.js";
import Party from "../models/party.js";

export const handleMoveIn = async (req, res) => {
    const {date,organization,party,category,Weight,rate,rent,rentStatus,lotNumber,quantity,remainingQuantity,location,remarks,additionalCharges} = req.body;
    console.log(req.body);
    try {
        if(!date || !organization || !party || !category || !Weight || !rate || !rent || !rentStatus || !lotNumber || !quantity || !remainingQuantity || !location){
            return res.status(400).json({ error: "All fields are required" });
        }
        const moveIn = await movein.create({date,organization,party,category,Weight,rate,rent,rentStatus,lotNumber,quantity,remainingQuantity,location,remarks,additionalCharges});
        res.status(201).json({ moveIn });
    } catch (error) {
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}

export const handleMoveOut = async (req, res) => {
    const {moveInId,quantity,date,party} = req.body;
    try {
        if(!moveInId || !quantity || !date || !party){
            return res.status(400).json({ error: "All fields are required" });
        }
        const moveOut = await moveout.create({moveInId,quantity,date,party});
        res.status(201).json({ moveOut });
    } catch (error) {
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}