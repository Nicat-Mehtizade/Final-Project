const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verify =  (roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      const token = authHeader
      ? authHeader.split(" ")[1]
      : req.cookies.token;
      // console.log(token);
      // console.log(authHeader);
      if (!token) {
        return res.status(401).json({
          message: "Token is required",
        });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Unauthorized, You do not have an access!",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.clearCookie("token",token, {
        httpOnly:false,
        sameSite: "Lax"
      });
      res.status(500).json({
        error: error.message,
      });
    }
  };
};

module.exports=verify