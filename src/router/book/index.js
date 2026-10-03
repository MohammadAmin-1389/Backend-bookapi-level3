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

router.post("/", auth, validation.create, createBook);

router.put("/:id", auth, validation.update, updateBook);

router.delete("/:id", auth, validation.id, deleteBook);

router.get("/:id", getBookById);

router.post("/", validation.create, createBook);

router.put("/:id", validation.update, updateBook);

router.delete("/:id", validation.id, deleteBook);

export default router;
