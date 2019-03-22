const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')
const {
  findImg,
  findPrepTime,
  findCookTime,
  findTotalTime,
  findIngredients,
  findInstructions,
  findServings
} = require('../scrapers')

module.exports = router

router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))

router.post('/scrape', (req, res, next) => {
  request(req.body.url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)

      const recipe = {
        name: $('title')
          .first()
          .text(),
        imgUrl: findImg($),
        prepTime: findPrepTime($),
        cookTime: findCookTime($),
        totalTime: findTotalTime($),
        servings: findServings($),
        ingredients: findIngredients($),
        instructions: findInstructions($)
      }

      console.log('Title: ', recipe.name)
      console.log('imgUrl: ', recipe.imgUrl)
      console.log('prep time: ', recipe.prepTime)
      console.log('cookTime: ', recipe.cookTime)
      console.log('totalTime: ', recipe.totalTime)
      console.log('Servings: ', recipe.servings)
      console.log('Ingredients: ', recipe.ingredients)
      console.log('Instructions: ', recipe.instructions)

      res.send(recipe).status(200)
    } else {
      next(error)
    }
  })
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
