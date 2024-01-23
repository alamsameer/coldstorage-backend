export const verifyDev = (req, res, next) => {
  try {
    const { secret } = req.body;
    console.log(secret);
    if (secret !== process.env.DEV_SECRET) {
      return res.status(401).json({ error: "You are not authorized" });
    }
    next();
  } catch (e) {
    return res
      .status(400)
      .json({ message: "Missing required fields in the request body" });
  }
};
