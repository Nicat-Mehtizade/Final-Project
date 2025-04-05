const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verify =  (roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          message: "Token is required",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Unauthorized, You do not have an access!",
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
};

module.exports=verify