import jwt from "jsonwebtoken";

import sendError from "../utils/error.js";

const userAuthenticad = (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) return sendError(res, "jwt_not_sent");

  try {
    jwt.verify(authHeader, process.env.jwt, (err, decoded) => {
      if (err) sendError(res, "invalid_jwt");
      req.user = {
        id: decoded._id,
      };
    });
    next();
    
  } catch (error) {
    return sendError(res, 'internal_error')
  }

};

export default userAuthenticad;
