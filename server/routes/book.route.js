import express from "express";

import {
  getAllBooks,
  getBookById,
  getFreeBooks,
  getBooksByCategory,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getAllBooks);

router.get("/free", getFreeBooks);

router.get("/category/:category", getBooksByCategory);

router.get("/:id", getBookById);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;