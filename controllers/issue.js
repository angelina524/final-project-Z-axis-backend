const db = require('../models')
const { Issue } = db

const issueController = {
  add: (req, res) => {
    Issue.findAll().then((issue) => {
      // TODO
    })
  },
  delete: (req, res) => {
    Issue.findOne().then((issue) => {
      // TODO
    })
  },
  patch: (req, res) => {
    Issue.findOne().then((issue) => {
      // TODO
    })
  },
  getAll: (req, res) => {
    Issue.findAll().then((issue) => {
      // TODO
    })
  },
  getOne: (req, res) => {
    Issue.findOne().then((issue) => {
      // TODO
    })
  }
}

module.exports = issueController
