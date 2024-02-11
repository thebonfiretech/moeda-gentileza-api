import { Router } from "express";

import EconomyController from "../../resources/economy/economy.controllers.js";
import auth from '../../middlewares/auth.js'

const service = new EconomyController();
const economyRouter = Router();

economyRouter.post("/investment/create", auth, service.createInvestment);
economyRouter.put("/investment/update", auth, service.updateInvestiment);
economyRouter.get("/investment/", auth, service.getInvestiments);
economyRouter.get("/transactions", auth, service.getTransactions);
economyRouter.put("/pix", auth, service.pix);

export default economyRouter;