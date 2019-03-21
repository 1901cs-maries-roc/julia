const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')

module.exports = router

router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))

const findIngredients = $ => {
  const ingredients = []
  const ingredientsLabel = $(':contains("Ingredients")').filter((i, elem) => {
    return $(elem).text() === 'Ingredients' || $(elem).text() === 'Ingredients:'
  })
  ingredientsLabel
    .parent()
    .find('ul')
    .children('li')
    .each((i, elem) => {
      const ingredient = $(elem).text()
      if (!isNaN(ingredient[0])) ingredients[i] = ingredient.trim()
    })
  return ingredients
}

const findInstructions = $ => {
  const instructions = []
  const instructionLists = $('ol').filter((i, elem) => {
    return $(elem).attr('class') !== 'comment-list'
  })
  instructionLists.find('li').each((i, elem) => {
    instructions[i] = $(elem).text()
  })
  return instructions
}

const findImg = $ => {
  let imgUrl
  $('img').each((i, elem) => {
    const imgHeight = Number($(elem).attr('height'))
    const imgWidth = Number($(elem).attr('width'))
    if (imgHeight < imgWidth * 2 && imgHeight > 300) {
      imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
      return false
    }
  })
  return imgUrl
}

const findPrepTime = ($, prepTimeRoot) => {
  return prepTimeRoot.text().trim()
}

const findCookTime = ($, prepTimeRoot) => {
  return prepTimeRoot.nextAll().text()
}

router.post('/scrape', (req, res, next) => {
  request(req.body.url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)
      const prepTimeRoot = $(':contains("Prep")').filter((i, elem) => {
        const r = /^Prep/
        return r.test(
          $(elem)
            .text()
            .trim()
        )
      })

      const name = $('title')
        .first()
        .text()
      const instructions = findInstructions($)
      const ingredients = findIngredients($)
      const imgUrl = findImg($)
      const prepTime = findPrepTime($, prepTimeRoot)
      const cookTime = findCookTime($, prepTimeRoot)

      console.log('Title: ', name)
      console.log('imgUrl: ', imgUrl)
      console.log('prep time: ', prepTime)
      // console.log('findCookTime: ', cookTime)
      // console.log('Ingredients: ', ingredients)
      // console.log('Instructions: ', instructions)

      res.sendStatus(200)
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
