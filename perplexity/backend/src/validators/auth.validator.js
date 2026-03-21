import { body } from "express-validator";
import { validationResult } from "express-validator";
export const validate = (req, res, next) => {
  const errors = validationResult(req); // ✅ req is required

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};

export const registerValidator = [
  // Username
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .trim(),

  // Email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),

  // Password
  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number"),
    

    validate, // This will run the validation and return errors if any
];

export const loginValidator = [
  // Email
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),
  // Password
  body("password")
    .notEmpty().withMessage("Password is required"),
  validate
];