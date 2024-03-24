const HttpError = require("../models/http-error");
const {validationResult} = require('express-validator')
const User = require("../models/users")

async function getUsers(req, res, next) {
  let users
  try {
     users = await User.find({}, "-password").populate("places", "-creator")
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not get users !", 500))
  }
  res.json(users);
}

async function signup(req, res, next) {
  const validResult = validationResult(req).array()
  if (validResult.length !== 0) {
    return next(new HttpError("Please check your input data", 400))
  }
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({email: email})
  } catch (error) {
    console.error(error)
    return next(new HttpError("Sign-up failed !", 500))
  }

  if (existingUser) {
    return next(new HttpError("User existing, please login !", 500));
  }

  const newUser = new User({ name, email, password, image: req.file.path, places: [] });
  let user
  try {
    user = await newUser.save()
  } catch (error) {
    console.error(error)
    return next(new HttpError("Sign-up false, please try again !", 500))
  }

  res.status(201).json({user});
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let user
  try {
    user = await User.findOne({email})
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not login, please try again !", 500))
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Wrong email or password", 401));
  }

  res.json({ message: "Login successful", user });
}

module.exports = { getUsers, signup, login };
