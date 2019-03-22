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
      },
      include: [
        {
          model: Ingredient
        },
        {
          model: Tag
        }
      ]
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
      imgUrl: req.body.img,
      name: req.body.title,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      waitTime: req.body.waitTime,
      serving: req.body.servings,
      steps: req.body.instructions,
      ingredients: req.body.ingredients,
      tags: req.body.tags
    }
    const newRecipe = await Recipe.create(recipe)
    res.json(newRecipe)
    await Recipe.findById(recipe.id)
  } catch (err) {
    next(err)
  }
})
