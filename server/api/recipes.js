const router = require('express').Router()
const {Recipe, Ingredient, Tag} = require('../db/models')
const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')
const {
  findImg,
  findPrepTime,
  findCookTime,
  findTotalTime,
  findIngredients,
  findInstructions,
  findServings,
  findTitle
} = require('../../script/scrapers')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (err) {
    next(err)
  }
})

router.get('/:recipeId', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const recipe = await Recipe.findOne({
      where: {
        id: recipeId
      }
    })
    res.json(recipe)
  } catch (err) {
    next(err)
  }
})

router.get('/:recipeId/:stepNum', async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId
    const stepNum = req.params.stepNum
    const recipe = await Recipe.findOne({
      where: {
        id: recipeId
      },
      include: [
        {
          model: Ingredient
        }
      ]
    })

    res.json(recipe.steps[stepNum - 1])
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const recipe = {
      imgUrl: req.body.imgUrl,
      name: req.body.name,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      totalTime: req.body.waitTime,
      serving: req.body.serving,
      steps: req.body.steps,
      ingredients: req.body.ingredients
      // tags: req.body.tags
    }
    const newRecipe = await Recipe.create(recipe)
    res.json(newRecipe)
  } catch (err) {
    next(err)
  }
})

router.post('/scrape', async (req, res, next) => {
  try {
    const {data: html} = await axios.get(req.body.url)
    // catch error if html doesn't load
    const $ = cheerio.load(html)
    const recipe = {
      name: findTitle($),
      imgUrl: findImg($),
      prepTime: findPrepTime($),
      cookTime: findCookTime($),
      totalTime: findTotalTime($),
      serving: findServings($),
      ingredients: findIngredients($),
      steps: findInstructions($)
    }
    console.log('>> Scraped recipe: ', recipe)

    const savedRecipe = await Recipe.create(recipe)
    res.send(savedRecipe).status(200)
  } catch (err) {
    next(err)
  }
})
