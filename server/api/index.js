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

      // console.log('Title: ', name)
      // console.log('imgUrl: ', imgUrl)
      // console.log('prep time: ', prepTime)
      // console.log('cookTime: ', cookTime)
      // console.log('totalTime: ', totalTime)
      // console.log('Ingredients: ', ingredients)
      // console.log('Instructions: ', instructions)
      console.log('Servings: ', findServings($))

      const recipe = {
        name: $('title')
          .first()
          .text(),
        imgUrl: findImg($),
        prepTime: findPrepTime($),
        cookTime: findCookTime($),
        totalTime: findTotalTime($),
        ingredients: findIngredients($),
        instructions: findInstructions($)
      }
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
