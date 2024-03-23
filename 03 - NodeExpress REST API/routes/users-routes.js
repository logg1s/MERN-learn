const userControllers = require("../controllers/user-controller");
const { check } = require("express-validator");
const express = require("express");
const fileUpload = require("../middleware/file-upload");
const router = express.Router();

router.get("/", userControllers.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty().withMessage("Name must not be empty"),
    check("email").isEmail().withMessage("Not a valid Email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;
