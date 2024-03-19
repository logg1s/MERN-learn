const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const placeControllers = require("../controllers/place-controller");

const validPlaceRule = [
  check("title").notEmpty().withMessage("Title must not be empty"),
  check("description").trim().isLength({ min: 5 }).withMessage("Description must be at least 5 characters"),
];

router.get("/", placeControllers.getAllPlace);

router.get("/:pid", placeControllers.getPlaceById);

router.get("/user/:uid", placeControllers.getPlacesByUserId);

router.post("/", validPlaceRule, placeControllers.createPlace);

router.patch("/:pid", validPlaceRule, placeControllers.updatePlace);

router.delete("/:pid", placeControllers.deletePlace);

module.exports = router;
