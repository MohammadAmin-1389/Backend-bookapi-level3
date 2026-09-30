import express from "express";

import bookRouter from "./book/index.js";

const router = express.Router();

router.use("/book", bookRouter);

export default router;
