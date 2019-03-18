const User = require('./user')
const Recipe = require('./recipe')
const Tag = require('./tag')
const Ingredient = require('./ingredient')
const db = require('../db')

const tagRecipe = db.define('tagRecipe')

Recipe.belongsTo(User)
User.hasMany(Recipe)
Ingredient.belongsTo(Recipe)
Recipe.hasMany(Ingredient)
Tag.belongsToMany(Recipe, {through: tagRecipe})
Recipe.belongsToMany(Tag, {through: tagRecipe})

module.exports = {
  User,
  Tag,
  Recipe,
  Ingredient,
  tagRecipe
}
