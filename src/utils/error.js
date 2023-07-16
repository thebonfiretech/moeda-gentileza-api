import errors from "../assets/errors.json" assert { type: "json" };
import logger from "./logger.js";

const sendError = (res, errorMessage, replaceMessage) => {
  errorMessage = errorMessage.toLowerCase();

  if (!errors[errorMessage]) {
    throw new Error("Error message does not exist");
  }

  const error = errors[errorMessage];
  errorMessage = error.message.replace("%%%", replaceMessage);
  try {
    
    logger.error(errorMessage);
    
    res.status(error.statusCode).json({
      error:{
        code: error.statusCode,
        message: errorMessage
      }
    });
      
  } catch{}
};

export default sendError;
