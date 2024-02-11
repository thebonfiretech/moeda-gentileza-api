import { Router } from "express";

import EconomyController from "../../resources/economy/economy.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new EconomyController();
const economyRouter = Router();

economyRouter.put("/pix", auth, service.pix);
economyRouter.get("/transactions", auth, service.getTransactions);

export default economyRouter;