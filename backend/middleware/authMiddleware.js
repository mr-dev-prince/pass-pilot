import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Token Expired" });
    }
    
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

export default authMiddleware;
