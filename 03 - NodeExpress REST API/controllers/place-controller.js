const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/places");

async function getAllPlace(req, res, next) {
  let places;
  try {
    places = await Place.find();
  } catch (err) {
    return next(new HttpError("Could not get all place"), 500);
  }
  res.json(places);
}

async function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(new HttpError("Could not get this place"), 500);
  }
  res.json(place);
}

async function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("Could not get places from this user !"), 500);
  }
  res.json(places);
}

async function createPlace(req, res, next) {
  const validResult = validationResult(req).array();
  if (validResult.length !== 0) {
    return res.status(400).json({ errors: validResult });
  }
  let coord;
  try {
    coord = await getCoordsForAddress(req.body.address);
  } catch (error) {
    return next(new HttpError("Can't get coordinates with API", 401));
  }
  if (coord.features.length === 0) {
    return next(new HttpError("Can't get coordinates for this address", 403));
  }
  const createdPlace = new Place({
    ...req.body,
    location: {
      lat: coord.features[0].properties.lat,
      lng: coord.features[0].properties.lon,
    },
  });
  let result;
  try {
    result = await createdPlace.save();
  } catch (error) {
    return next(new HttpError("Could not save this place", 500));
  }
  res.status(201).json(result);
}

async function updatePlace(req, res, next) {
  const validResult = validationResult(req).array();
  if (validResult.length !== 0) {
    return res.status(400).json({ errors: validResult });
  }
  const placeId = req.params.pid;
  let updatedPlace;
  try {
    updatedPlace = await Place.findByIdAndUpdate(
      placeId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { returnDocument: "after" }
    );
  } catch (error) {
    return next(new HttpError("Could not update this place !", 500));
  }
  res.json(updatedPlace);
}

async function deletePlace(req, res, next) {
  const placeId = req.params.pid;
  let result;
  try {
    result = await Place.findByIdAndDelete(placeId);
    if (!result) throw new Error();
  } catch (error) {
    return next(new HttpError("Could not delete this place !", 500));
  }
  res.json({ message: "Delete success", result });
}

module.exports = {
  getAllPlace,
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
