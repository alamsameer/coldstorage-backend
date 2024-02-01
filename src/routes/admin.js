import { Router } from "express";
import { adminSignin,employeeSignup,adminAddParty} from "../controller/user.js";
import { verifyAdmin } from "../middleware/auth/user.js";

const route = Router();

// admin routes
route.post("/admin/signin", adminSignin);
route.post("/admin/addemployee", verifyAdmin , employeeSignup);
route.post("/admin/addparty",verifyAdmin,adminAddParty)

export default route