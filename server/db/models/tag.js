const Sequelize = require('sequelize')
const db = require('../db')

const Tag = db.define('tag', {
  title: {
    type: Sequelize.STRING,
    validate: {
      isIn: [
        [
          'breakfast',
          'brunch',
          'lunch',
          'dinner',
          'easy',
          'intermediate',
          'difficult'
        ]
      ]
    }
  }
})

module.exports = Tag
