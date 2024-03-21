const HttpError = require("../models/http-error");
const {validationResult} = require('express-validator')
const User = require("../models/users")

async function getUsers(req, res, next) {
  let users
  try {
     users = await User.find({}, "-password")
  } catch (error) {
    return next(new HttpError("Could not get users !", 500))
  }
  res.json(users);
}

async function signup(req, res, next) {
  const validResult = validationResult(req).array()
  if (validResult.length !== 0) {
     return res.status(400).json({errors: validResult})
  }
  const { name, email, password, image, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email})
  } catch (error) {
    return next(new HttpError("Sign-up failed !", 500))
  }

  if (existingUser) {
    return next(new HttpError("User existing, please login !", 500));
  }

  const newUser = new User({ name, email, password, image, places });
  let result
  try {
    result = await newUser.save()
  } catch (error) {
    return next(new HttpError("Sign-up false, please try again !", 500))
  }

  res.status(201).json(result);
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let account
  try {
    account = await User.findOne({email})
  } catch (error) {
    return next(new HttpError("Could not login, please try again !", 500))
  }

  if (!account || account.password !== password) {
    return next(new HttpError("Wrong email or password", 401));
  }

  res.json({ message: "Login successful" });
}

module.exports = { getUsers, signup, login };
