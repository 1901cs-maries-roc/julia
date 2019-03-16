const User = require('./user')
const Recipe = require('./recipe')
const Tag = require('./tag')
const Ingredient = require('./ingredient')
const db = require('../db')
const Sequelize = require('sequelize')

const recipeIngredient = db.define('recipeIngredient', {
  quantity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sectionName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
})

Recipe.belongsTo(User)
User.hasMany(Recipe)
Ingredient.belongsToMany(Recipe, {through: recipeIngredient})
Tag.hasMany(Recipe)

module.exports = {
  User,
  Tag,
  Recipe,
  recipeIngredient,
  Ingredient
}
