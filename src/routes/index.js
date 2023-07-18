import { Router } from "express";

import userRouter from "./user.router.js";
import shopRouter from './shop.router.js';
import blogRouter from './blog.router.js';
import pixRouter from './pix.router.js';

export const router = Router();

router.get("/ping", (req, res) => {
  res.sendStatus(200);
});

router.use("/user", userRouter);
router.use("/shop", shopRouter);
router.use("/blog", blogRouter);
router.use("/pix", pixRouter);
