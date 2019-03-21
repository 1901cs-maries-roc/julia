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

const extractTime = rootEl => {
  const num = /\d/
  const unit = /\sm|\sh/
  const timeIndex = rootEl.search(num)
  const unitIndex = rootEl.search(unit) + 1
  // console.log(">>rootEL: ", rootEl)
  // console.log(">>time/unit: ", rootEl[timeIndex], "/", rootEl[unitIndex])
  const time = rootEl.slice(timeIndex, unitIndex)
  return rootEl[unitIndex] === 'h' ? time * 60 : time
}

const findPrepTime = $ => {
  const rootEl = $(':contains("Prep")')
    .filter((i, elem) => {
      const r = /^Prep/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  return extractTime(rootEl)
}

const findCookTime = $ => {
  const rootEl = $(':contains("Cook")')
    .filter((i, elem) => {
      const r = /^Cook\s|^Cook\d/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  return extractTime(rootEl)
}

const findTotalTime = $ => {
  const rootElA = $(':contains("Total Time")')
    .filter((i, elem) => {
      const r = /^Total Time/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()

  const rootElB = $(':contains("Ready In")')
    .filter((i, elem) => {
      const r = /^Ready In/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  const rootEl = rootElA || rootElB
  return extractTime(rootEl)
}

router.post('/scrape', (req, res, next) => {
  request(req.body.url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)

      const name = $('title')
        .first()
        .text()
      const instructions = findInstructions($)
      const ingredients = findIngredients($)
      const imgUrl = findImg($)
      const prepTime = findPrepTime($)
      const cookTime = findCookTime($)
      const totalTime = findTotalTime($)

      // console.log('Title: ', name)
      // console.log('imgUrl: ', imgUrl)
      console.log('prep time: ', prepTime)
      console.log('cookTime: ', cookTime)
      console.log('totalTime: ', totalTime)
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
