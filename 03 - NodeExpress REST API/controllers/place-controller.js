const HttpError = require("../models/http-error");
const uuid = require("uuid");
let DUMMY_PLACE = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the famous sky in the world",
    imageUrl: "https://media.timeout.com/images/101705309/1024/576/image.webp",
    address: "20 W 34th St., New York, NY 10001, Hoa Kỳ",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire",
    description: "One of the famous sky in the world",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=s1360-w1360-h1020",
    address: "20 W 34th St., New York, NY 10001, Hoa Kỳ",
    location: {
      lat: 40.7484405,
      lng: -73.9856644,
    },
    creator: "u1",
  },
];

function getAllPlace(req, res, next) {
    res.status(200).json(DUMMY_PLACE)
}

function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  const place = DUMMY_PLACE.find((p) => p.id === placeId);

  if (!place || place.length === 0) {
    return next(new HttpError("Doesn't exist place", 404));
    }
     res.json({ place });
}

function getPlacesByUserId(req, res, next) {
  const userId = req.params.uid;
  const place = DUMMY_PLACE.filter((p) => p.creator === userId);
  if (!place || place.length === 0) {
    return next(new HttpError("Doesn't exist user", 404));
}
 res.json({ place });
}

function createPlace(req, res, next) {
  const createdPlace = {id: uuid.v4(), ...req.body };
  DUMMY_PLACE.push(createdPlace);
  res.status(201).json({ place: createdPlace});
}

function updatePlace(req, res, next) {
    const placeId = req.params.pid
    const {title, description} = req.body

    const placeIndex = DUMMY_PLACE.findIndex(p => p.id === placeId)
    if(placeIndex === -1) {
        return next(new HttpError("Could not find this place", 403))
    }

    const updatedPlace = {...DUMMY_PLACE[placeIndex], title, description}
    DUMMY_PLACE[placeIndex] = updatedPlace
    
    res.status(200).json({updatedPlace})
}

function deletePlace(req, res, next) {
    const placeId = req.params.pid

    const placeIndex = DUMMY_PLACE.findIndex(p => p.id === placeId)
    if(placeIndex === -1) {
        return next(new HttpError("Could not find this place", 403))
    }

    DUMMY_PLACE.splice(placeIndex, 1)
    
    res.status(200).json({message: "Delete success"})
}

module.exports = {
    getAllPlace,
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
};
