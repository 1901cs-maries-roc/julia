const Sequelize = require('sequelize')
const db = require('../db')

const RecipeIngredient = db.define('recipeIngredient', {
  quantity: {
    type: sequelize.FLOAT,
    allowNull: false
  },
  sectionName: {
    type: sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
})

module.exports = RecipeIngredient;