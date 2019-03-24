const router = require('express').Router()
const {Recipe, Ingredient, Tag} = require('../db/models')
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
      waitTime: req.body.waitTime,
      serving: req.body.serving,
      steps: req.body.steps.split('\n'),
      ingredients: req.body.ingredients.split('\n')
    }
    const newRecipe = await Recipe.create(recipe)
    res.json(newRecipe)
  } catch (err) {
    next(err)
  }
})
