import MoveIn from "../models/movein.js";
import MoveOut from "../models/moveout.js";
// show total number of inwards 
export const totalItems=async(req,res)=>{
    try{
        const organization=req.user.organization;
        const moveIn = await MoveIn.find({ organization, remainingQuantity: { $gt: 0 } }).populate('party');
        const totalInwards=moveIn.length;
        res.status(201).json({message:"Total Inwards",totalInwards});
    }catch(error){
        console.log(error);
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}
// show total outwards number
// show amount to be paid of total

export const totalRevenue=async(req,res)=>{
    try{
        const organization=req.user.organization;
        const moveIn = await MoveIn.find({ organization });
        let totalRevenue=0;
        moveIn.map((item)=>{
            totalRevenue+=item.rent;
        })
        res.status(201).json({message:"Total Revenue",totalRevenue});
    }catch(error){
        console.log(error);
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}

// list all the user who have not paid 
export const totalLeftAmount=async(req,res)=>{
    try{
        const organization=req.user.organization;
        const moveIn = await MoveIn.find({ organization, rentStatus: false }).populate('party');
        const totalLeftAmount=moveIn.reduce((acc, item) => acc + item.rent, 0);
        res.status(201).json({message:"Total Left Amount",moveIn,totalLeftAmount});
    }catch(error){
        console.log(error);
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}
// list all the user who have paid 
export const totalPaid=async(req,res)=>{
    try{
        const organization=req.user.organization;
        const moveIn = await MoveIn.find({ organization, rentStatus: true }).populate('party');
        const totalPaid=moveIn.reduce((acc, item) => acc + item.rent, 0);
        res.status(201).json({message:"Total Paid",moveIn,totalPaid});
    }catch(error){
        console.log(error);
        console.log({ message: error.message });
        res.status(409).json({ message:"something went wrong" });
    }
}
// show the total number of trades
