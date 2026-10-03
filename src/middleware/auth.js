import jwt from "jsonwebtoken";
import c from "config";

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        message: "You are not authenticated",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, c.get("jwt.secret"));

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default auth;
