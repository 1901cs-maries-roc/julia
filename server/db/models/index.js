const User = require('./user')
const Recipe = require('./recipe')
const Tag = require('./tag')
const Ingredient = require('./ingredient')
const db = require('../db')
const Sequelize = require('sequelize')

const RecipeIngredient = db.define('recipeIngredient', {
  quantity: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  sectionName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null
  }
})

const RecipeTag = db.define('recipeTag', {
  tag: {
    type: Sequelize.STRING
  }
})

Recipe.belongsTo(User)
User.hasMany(Recipe)
Ingredient.belongsToMany(Recipe, {through: RecipeIngredient})
Tag.belongsToMany(Recipe, {through: RecipeTag})

// Recipe.belongsTo(User);
// User.hasMany(Recipe);
// Tag.belongsToMany(Recipe, {through: category});
// Ingredient.belongsToMany(Recipe, {through: recipeIngredient})

module.exports = {
  User,
  Tag,
  Recipe,
  RecipeIngredient,
  Ingredient,
  RecipeTag
}
