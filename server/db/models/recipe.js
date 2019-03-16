const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'recipe-default.jpg'
  },
  serving: {
    type: Sequelize.INTEGER,
    valiate: {
      min: 0
    }
  },
  prepTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  cookTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  waitTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  steps: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Recipe
