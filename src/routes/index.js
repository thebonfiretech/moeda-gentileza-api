import { Router } from "express";

import userRouter from "./user.router.js";

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use("/user", userRouter);
