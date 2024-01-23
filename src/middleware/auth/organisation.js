import Organization from "../../models/organization.js";
export const verifyOrganisation = async (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ error: 'Access denied. Token is required.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        const { _id,role } = payload;
        const user = await Organization.findById(_id);
        if (user.role !== role) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        req.user = user;
        next();
    });
}