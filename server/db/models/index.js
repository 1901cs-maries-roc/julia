const User = require('./user')
const Recipe = require('./recipe')
const Tag = require('./tag')
const db = require('../db')

const tagRecipe = db.define('tagRecipe')
const favRecipes = db.define('favRecipes')

Recipe.belongsTo(User)
User.hasMany(Recipe)
Tag.belongsToMany(Recipe, {through: tagRecipe})
Recipe.belongsToMany(Tag, {through: tagRecipe})

User.belongsToMany(Recipe, {through: favRecipes})
Recipe.belongsToMany(User, {through: favRecipes})

module.exports = {
  User,
  Tag,
  Recipe,
  tagRecipe,
  favRecipes
}
