import { Router } from "express";
import { employeeSignin,employeeSignup } from "../controller/user.js";
import { verifyTokenAndRole } from "../middleware/auth/user.js";
// import { verifyOrganisation } from "../middleware/auth/organisation.js";


const route = Router();
// employee routes
route.post("/employee/signin", employeeSignin);


export default route