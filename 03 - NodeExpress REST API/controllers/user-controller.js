const HttpError = require("../models/http-error");
const {validationResult} = require('express-validator')
const User = require("../models/users")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function getUsers(req, res, next) {
  let users
  try {
     users = await User.find({}, "-password").populate("places", "-creator")
  } catch (error) {
    console.error("get user error: " + error.message)
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
    console.error("sign up error: " + error.message)
    return next(new HttpError("Sign-up failed !", 500))
  }
  
  if (existingUser) {
    return next(new HttpError("User existing, please login !", 500));
  }
  
  let user
  let token
  try {
    let hashPassword = bcrypt.hashSync(password, 12)
    const newUser = new User({ name, email, password: hashPassword, image: req.file.path, places: [] });
    user = await newUser.save()
    token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, "secret_key_he_he_ho_ho", {expiresIn: "1h"})
  } catch (error) {
    console.error("" + error.message)
    return next(new HttpError("Sign-up false, please try again !", 500))
  }

  res.status(201).json({userId: user._id, email, token});
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let user
  let token
  try {
    user = await User.findOne({email})
    token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
    }, "secret_key_he_he_ho_ho", {expiresIn: "1h"})
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not login, please try again !", 500))
  }

  let isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!user || !isCorrectPassword) {
    return next(new HttpError("Wrong email or password", 401));
  }

  res.json({ message: "Login successful", userId: user._id, email, token });
}

module.exports = { getUsers, signup, login };
