import { Router } from "express";
import { handleMoveIn, handleMoveOut } from "../controller/inventoryController.js";
import { verifyAdmin } from "../middleware/auth/user.js";

const router=Router();

router.post("/movein",verifyAdmin,handleMoveIn)

router.post("/moveout",verifyAdmin,handleMoveOut)

export default router