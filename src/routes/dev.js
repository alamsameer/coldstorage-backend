import { Router } from "express";
import { organizationSignup ,listOrganisation} from "../controller/organization.js";
import { adminSignup,adminSignin,employeeSignin,employeeSignup } from "../controller/user.js";
import { verifyDev } from "../middleware/auth/dev.js";


const route = Router();

// create ORG
route.post("/dev/org/signup", verifyDev, organizationSignup);
route.post("/dev/org", verifyDev, listOrganisation);
// create ADMIN 
route.post("/dev/admin/signup", verifyDev, adminSignup);
;


export default route