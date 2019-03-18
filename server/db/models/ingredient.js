const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    type: Sequelize.FLOAT
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

module.exports = Ingredient
