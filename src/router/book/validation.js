import { body, param, validationResult } from "express-validator";

const checkErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

const fieldsValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim(),

  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string")
    .trim(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .trim(),
];

const idValidation = [
  param("id")
    .notEmpty()
    .withMessage("Book id is required")
    .isMongoId()
    .withMessage("Book id must be a valid MongoDB id"),

  checkErrors,
];

const validation = {
  create: [...fieldsValidation, checkErrors],

  update: [...idValidation.slice(0, -1), ...fieldsValidation, checkErrors],

  id: idValidation,
};

export default validation;
