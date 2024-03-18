const express = require('express')
const router = express.Router()
const placeControllers = require('../controllers/place-controller')

router.get('/', placeControllers.getAllPlace)

router.get('/:pid', placeControllers.getPlaceById)

router.get('/user/:uid', placeControllers.getPlacesByUserId)

router.post('/', placeControllers.createPlace)

router.patch('/:pid', placeControllers.updatePlace)

router.delete('/:pid', placeControllers.deletePlace)


module.exports = router
