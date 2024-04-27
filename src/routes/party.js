import { Router } from "express";
import { getAllPartiesByOrganization } from "../controller/party.js";
import { verifyTokenAndRole } from "../middleware/auth/user.js";
const route = Router();

route.get("/allparty",verifyTokenAndRole,getAllPartiesByOrganization);

export default route