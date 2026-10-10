import express from "express";

import auth from "../../middleware/auth.js";

import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./controller.js";

import validation from "./validation.js";

const router = express.Router();

router.get("/", auth, getBooks);

router.get("/:id", auth, validation.id, getBookById);

router.post("/", auth, validation.create, createBook);

router.put("/:id", auth, validation.update, updateBook);

router.delete("/:id", auth, validation.id, deleteBook);

export default router;
