const Sequelize = require('sequelize')
const db = require('../db')

const Tags = db.define('tags', {
  title: {
    type: sequelize.STRING,
    validate: {
      isIn: [['breakfast', 'brunch', 'lunch', 'dinner', 'easy', 'intermediate', 'difficult']]
    }
  },
})

module.exports = Tags;