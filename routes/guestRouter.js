const express = require('express')
const guestRouter = express.Router()
const guestController = require('../controllers/guest')

guestRouter.post('/', guestController.createGuest)

module.exports = guestRouter
