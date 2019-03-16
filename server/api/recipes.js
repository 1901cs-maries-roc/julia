const router = require('express').Router()
const {Recipe} = require('../db/models')
module.exports = router

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
