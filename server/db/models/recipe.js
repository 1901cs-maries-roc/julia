const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING
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
  totalTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  steps: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Recipe
