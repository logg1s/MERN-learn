const HttpError = require("../models/http-error");
const uuid = require("uuid");
const DUMMY_PLACE = [
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
    creator: "u2",
  },
];

function getPlaceById(req, res, next) {
  const placeId = req.params.pid;
  const place = DUMMY_PLACE.find((p) => p.id === placeId);

  if (place) {
    return res.json({ place });
  }
  next(new HttpError("Doesn't exist place", 404));
}

function getPlaceByUserId(req, res, next) {
  const userId = req.params.uid;
  const place = DUMMY_PLACE.find((p) => p.creator === userId);
  if (place) {
    return res.json({ place });
  }
  next(new HttpError("Doesn't exist user", 404));
}

function createPlace(req, res, next) {
  const createdPlace = { ...req.body, id: uuid.v4()};
  DUMMY_PLACE.push(createdPlace);
  res.status(201).json({ place: createdPlace});
}

module.exports = {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
};
