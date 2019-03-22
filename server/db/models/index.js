const User = require('./user')
const Recipe = require('./recipe')
const Tag = require('./tag')
const Ingredient = require('./ingredient')
const db = require('../db')
const Sequelize = require('sequelize')

const recipeIngredient = db.define('recipeIngredient', {
  quantity: {
    type: Sequelize.STRING
  },
  measure: {
    type: Sequelize.STRING
  },
  sectionName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
})

const tagRecipe = db.define('tagRecipe')

Recipe.belongsTo(User)
User.hasMany(Recipe)
// Ingredient.belongsToMany(Recipe, {through: recipeIngredient})
// Recipe.belongsToMany(Ingredient, {through: recipeIngredient})
Tag.belongsToMany(Recipe, {through: tagRecipe})
Recipe.belongsToMany(Tag, {through: tagRecipe})

module.exports = {
  User,
  Tag,
  Recipe,
  recipeIngredient,
  Ingredient,
  tagRecipe
}
