const express = require('express')
const issueRouter = express.Router()
const issueController = require('../controllers/issue')

issueRouter.post('/', issueController.add)
issueRouter.delete('/issueId', issueController.delete)
issueRouter.patch('/issueId', issueController.patch)
issueRouter.get('/', issueController.getAll)
issueRouter.get('/issueId', issueController.getOne)

module.exports = issueRouter
