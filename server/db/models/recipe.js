const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fcdn-image.myrecipes.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2Frecipes%2Fck%2F11%2F04%2Ffettuccine-olive-oil-ck-x.jpg%3Fitok%3Dbt5Cny7R&w=450&c=sc&poi=face&q=85'
  },
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY,
    allowNull: false
  },
  serving: {
    type: Sequelize.INTEGER  //.RANGE?
  },
  prepTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    }
  },
  cookTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    }
  },
  waitTime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0
  },
  directions: {
    type: Sequelize.ARRAY
  }
})

module.exports = Recipe;