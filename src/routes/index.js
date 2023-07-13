import { Router } from "express";

import userRouter from "./user.router.js";
import pixRouter from './pix.router.js';
import shopRouter from './shop.router.js'

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use("/user", userRouter);
