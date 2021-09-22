const express = require('express')
const guestRouter = express.Router()
const guestController = require('../controllers/guest')
const { catchAsyncError } = require('../middlewares/error')

guestRouter.post('/', catchAsyncError(guestController.createGuest))

module.exports = guestRouter
