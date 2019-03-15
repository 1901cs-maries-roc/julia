const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
})

module.exports = Ingredient;