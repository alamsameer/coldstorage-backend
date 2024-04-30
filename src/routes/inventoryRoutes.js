import { Router } from "express";
import { handleMoveIn, handleMoveOut,getMovedIn ,getMovedOut,getRecentMovedIn,getRecentMovedOut} from "../controller/inventoryController.js";
import { verifyAdmin,verifyTokenAndRole } from "../middleware/auth/user.js";

const router=Router();

router.post("/movein",verifyAdmin,handleMoveIn)
router.get("/movedinitems",verifyAdmin,getMovedIn)

// get recent moved in items
router.get("/recentmovedinitems",verifyTokenAndRole,getRecentMovedIn)

router.post("/moveout",verifyAdmin,handleMoveOut)

// get all moved out items

router.get("/movedoutitems",verifyAdmin,getMovedOut)

// get recent moved out items
router.get("/recentmovedoutitems",verifyTokenAndRole,getRecentMovedOut)


export default router