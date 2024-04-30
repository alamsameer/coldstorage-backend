import User from "../../models/user.js";
import jwt from "jsonwebtoken";


export const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
      return res.status(403).json({ error: 'Access denied. Token is required.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
          console.log(err);
            return res.status(401).json({ error: "error while verifying token" });
        }
        const { _id,role } = payload;
        console.log("payload",payload);
        console.log({ _id,role });
        const user = await User.findById(_id);
        console.log({user});
        if(!user){
          return res.status(404).json({message:"user does not exist"})
        }
        if (user.role !== role) {
            return res.status(401).json({ error: "You must be logged in" });
        }
        req.user = payload;
        next();
    });
}

//  middleware for employee and admin for both have access to the same routes
export const verifyTokenAndRole = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ error: 'Access denied. Token is required.' });
    }
  
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }
  
      const { role } = decoded;
      console.log("decoded",decoded);
      if (role !== 'admin' && role !== 'employee') {
        return res.status(403).json({ error: 'Access denied.' });
      }
  
      req.user = decoded;
      next();
    });
  };

