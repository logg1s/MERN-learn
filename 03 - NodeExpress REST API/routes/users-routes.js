const userControllers = require('../controllers/user-controller')

const express = require('express')
const router = express.Router()

router.get('/', userControllers.getUsers)

router.post('/signup', userControllers.signup)

router.post('/login', userControllers.login)

module.exports = router