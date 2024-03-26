const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/places");
const Users = require("../models/users");
const mongoose = require("mongoose")
const fs = require('fs')

async function getAllPlace(req, res, next) {
  let places;
  try {
    places = await Place.find().populate("creator", "-password -places");
  } catch (err) {
    console.error(err)
    return next(new HttpError("Could not get all place", 500))
  }
  res.json(places);
}

async function getPlaceById(req, res, next) {
  const placeId = mongoose.Types.ObjectId.createFromHexString(req.params.pid);
  let place;
  try {
    place = await Place.findById(placeId).populate("creator", "-password -places");
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not get this place", 500))
  }
  res.json(place);
}

async function getPlacesByUserId(req, res, next) {
  const userId = mongoose.Types.ObjectId.createFromHexString(req.params.uid);
  let places;
  try {
    places = await Place.find({ creator: userId }).populate("creator", "-password -places");
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not get places from this user !", 500))
  }
  res.json(places);
}

async function insertPlace(req, res, next) {
  if(!req?.file?.path) {
    return next(new HttpError("No image for place !", 403))
  }
  const {title, description, address} = req.body


  const validResult = validationResult(req).array();
  if (validResult.length !== 0) {
    return next(new HttpError("Please check your input data"), 401);
  }


  let coord;
  try {
    coord = await getCoordsForAddress(address);
  } catch (error) {
    console.error(error)
    return next(new HttpError("Can't get coordinates with API", 401));
  }
  if (coord.features.length === 0) {
    return next(new HttpError("Can't get coordinates for this address", 403));
  }

  let user
  try {
    user = await Users.findById(req.userData.userId)
  } catch (error) {
    console.error(error)
    return next(new HttpError("Could not find this user !", 500))
  }

  if(!user) {
    return next(new HttpError("User not exist !", 500))
  }

  const createdPlace = new Place({
    title,
    description,
    imageUrl: req.file.path,
    address, 
    location: {
      lat: coord.features[0].properties.lat,
      lng: coord.features[0].properties.lon,
    },
    creator: req.userData.userId
  });
  let sess;
  try {
    sess = await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({session: sess})
    user.places.push(createdPlace)
    await user.save({session: sess})
    await sess.commitTransaction()
  } catch (error) {
    console.error(error.message)
    return next(new HttpError("Could not save this place", 500));
  }
  res.status(201).json(createdPlace);
}

async function updatePlace(req, res, next) {
  
  const validResult = validationResult(req).array();
  if (validResult.length !== 0) {
    return next(new HttpError("Please check your input data"), 401);
  }
  const placeId = mongoose.Types.ObjectId.createFromHexString(req.params.pid);
  let place;
  try {
    place = await Place.findById(
      placeId).populate("creator", "-places -password")
    } catch (error) {
      console.error(error)
      return next(new HttpError("Could not find this place !", 500));
    }
  if(place.creator._id.toString() !== req.userData.userId) {

    return next(new HttpError("You don't have permission to update this place !", 403))
  }
  place.title = req.body.title
  place.description = req.body.description
  let updatedPlace
  try {
    updatedPlace = place.save()
  } catch (error) {
    return next(new HttpError("Could not update this place !", 500));
  }
    res.json(place);
  }
  
async function deletePlace(req, res, next) {
  const placeId = mongoose.Types.ObjectId.createFromHexString(req.params.pid);
  try {
    const sess = await mongoose.startSession()
    await sess.startTransaction()
    const place = await Place.findByIdAndDelete(placeId, {session: sess}).populate("creator")
    const user = place.creator
    if(user._id.toString() !== req.userData.userId){
      sess.abortTransaction()
      return next(new HttpError("You don't have permission to delete this place !", 403))
    }
    user.places.pull(place)
    await user.save({session: sess})
    await sess.commitTransaction()
    const imagePath = place.imageUrl
    fs.unlink(imagePath, () => {
    })
    
  } catch (error) {
    console.error("delete place: " + error.message)
    return next(new HttpError("Could not delete this place !", 500));
  }
  res.json({ message: "Delete success" });
}

module.exports = {
  getAllPlace,
  getPlaceById,
  getPlacesByUserId,
  createPlace: insertPlace,
  updatePlace,
  deletePlace,
};
