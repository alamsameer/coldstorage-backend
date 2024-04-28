import { Router } from "express"
import { verifyTokenAndRole } from "../middleware/auth/user.js"
import { totalItems,totalRevenue,totalLeftAmount,totalPaid } from "../controller/dashboard.js"

const router= Router()
// path to get total items remaining in inventory
router.get("/totalitems",verifyTokenAndRole,totalItems)
// path to get total revenue
router.get("/totalrevenue",verifyTokenAndRole,totalRevenue)
// path to get total left amount
router.get("/totalleftamount",verifyTokenAndRole,totalLeftAmount)
// path to get total paid amount
router.get("/totalpaid",verifyTokenAndRole,totalPaid)

export default router