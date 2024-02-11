import { Router } from "express";
import { handleMoveIn, handleMoveOut,getMovedIn } from "../controller/inventoryController.js";
import { verifyAdmin } from "../middleware/auth/user.js";

const router=Router();

router.post("/movein",verifyAdmin,handleMoveIn)
router.get("/movedinitems",verifyAdmin,getMovedIn)

router.post("/moveout",verifyAdmin,handleMoveOut)

export default router