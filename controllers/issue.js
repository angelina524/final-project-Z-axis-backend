const db = require('../models')
const { Issue } = db

const issueController = {
  add: async (req, res) => {
    const { title, description, beginTime, finishTime } = req.body
    // To discuss : userId storage
    const { userId } = req.session
    // To do : error handling
    const issue = await Issue.create({
      title,
      description,
      beginTime,
      finishTime,
      userId,
    })
    res.send({ issue })
  },
  delete: async (req, res) => {
    const { id } = req.params
    const { userId } = req.session
    // To discuss hard or soft delete
    await Issue.update(
      {
        isDelete: 1,
      },
      {
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      }
    )
    res.send('deleteIssue')
  },
  patch: async (req, res) => {
    const { title, description, beginTime, finishTime } = req.body
    const { id } = res.params
    const { userId } = req.session
    const response = await Issue.update(
      {
        title,
        description,
        beginTime,
        finishTime,
      },
      {
        where: {
          id: Number(id),
          userId: Number(userId),
        },
      }
    )
    res.send({ response })
  },
  getAll: async (req, res) => {
    const { userId } = req.userId
    const issues = await Issue.findAll({
      where: {
        userId: Number(userId)
      }
    })
    res.send({ issues })
  },
  getOne: async (req, res) => {
    const { userId } = req.session
    const { id } = req.params
    // To do : error handling
    const singleIssue = await Issue.findOne({
      where: {
        id: Number(id),
        userId: Number(userId),
      }
    })
    res.send({ singleIssue })
  },
}

module.exports = issueController
