import express from "express";

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./controller.js";

import validation from "./validation.js";

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", validation.create, createBook);

router.put("/:id", validation.update, updateBook);

router.delete("/:id", validation.id, deleteBook);

export default router;
