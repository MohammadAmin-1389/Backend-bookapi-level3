import _ from "lodash";
import Book from "./model.js";

export const getBooks = async (req, res, next) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    if (page < 1) page = 1;
    if (limit < 1) limit = 5;
    if (limit > 50) limit = 50;

    const skip = (page - 1) * limit;

    // فقط کتاب‌های کاربر فعلی
    const filter = {
      created_by: req.user.userId,
    };

    const [books, totalBooks] = await Promise.all([
      Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

      Book.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalBooks / limit);

    res.status(200).json({
      data: books,
      pagination: {
        currentPage: page,
        limit,
        totalBooks,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      created_by: req.user.userId,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const data = _.pick(req.body, ["title", "author", "description"]);

    const book = await Book.create({
      ...data,
      created_by: req.user.userId,
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const data = _.pick(req.body, ["title", "author", "description"]);

    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        created_by: req.user.userId,
      },
      data,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      created_by: req.user.userId,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
