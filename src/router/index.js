import express from "express";
import authRouter from "./auth/index.js";
import bookRouter from "./book/index.js";

const router = express.Router();

router.use("/auth", authRouter);

router.use("/book", bookRouter);

export default router;
