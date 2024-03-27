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
  let expire = new Date(new Date().getTime() + 1000 * 3600)
  try {
    if(!req?.file?.path) {
      throw new Error("No image for user")
    }
    let hashPassword = bcrypt.hashSync(password, 12)
    const newUser = new User({ name, email, password: hashPassword, image: req.file.path, places: [] });
    user = await newUser.save()
    token = jwt.sign({
      userId: user._id.toString(),
      email: user.email,
      expire
    }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})

  } catch (error) {
    console.error("" + error.message)
    return next(new HttpError("Sign-up false, please try again !", 500))
  }

  res.status(201).json({userId: user._id, email, token, expire});
}

async function login(req, res, next) {
  const { email, password } = req.body;
  let expire = new Date(new Date().getTime() + 1000 * 3600)
  let user
  let token
  try {
    user = await User.findOne({email})
    token = jwt.sign({
      userId: user._id.toString(),
      email: user.email,
      expire
    }, process.env.JWT_SECRET_KEY, {expiresIn: "1h"})
  } catch (error) {
    console.error(error)
    return next(new HttpError("Account not exist. Please sign-up !", 500))
  }

  let isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!user || !isCorrectPassword) {
    return next(new HttpError("Wrong email or password", 401));
  }

  res.json({ message: "Login successful", userId: user._id, email, token, expire });
}

function checkValidToken(req, res, next) {

  if(req.body.userId !== req.userData.userId || req.body.expire !== req.userData.expire) {
    return next(new HttpError("Token invalid !!!! xxxx", 403))
  }
  res.status(200).json({message: "Token is valid"})
}

module.exports = { getUsers, signup, login, checkValidToken };
