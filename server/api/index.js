const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')

module.exports = router

router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))

router.post('/scrape', (req, res, next) => {
  request(req.body.url, (error, response, html) => {
    if (!error) {
      const $ = cheerio.load(html)
      const name = $('title')
        .eq(0)
        .text()
      const ingredients = []
      const instructions = []
      const ingredientsLabel = $(':contains("Ingredients")').filter(
        (i, elem) => {
          return (
            $(elem).text() === 'Ingredients' ||
            $(elem).text() === 'Ingredients:'
          )
        }
      )
      const instructionLists = $('ol').filter((i, elem) => {
        return $(elem).attr('class') !== 'comment-list'
      })

      instructionLists.find('li').each((i, elem) => {
        instructions[i] = $(elem).text()
      })

      ingredientsLabel
        .parent()
        .find('li')
        .each((i, elem) => {
          ingredients[i] = $(elem).text()
        })

      let imgUrl
      let maxDimensions = 0
      $('img').each((i, elem) => {
        const imgDimensions =
          Number($(elem).attr('height')) * Number($(elem).attr('width'))
        // console.log("maxD: ", maxDimensions)
        // console.log("currentD: ", imgDimensions)
        if (imgDimensions > maxDimensions) {
          imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
          // console.log('img taller than last: ', $(elem).attr('data-src'))
          maxDimensions =
            Number($(elem).attr('height')) * Number($(elem).attr('width'))
        }
      })

      console.log('Title: ', name)
      console.log('imgUrl: ', imgUrl)
      console.log('Ingredients: ', ingredients)
      console.log('Instructions: ', instructions)

      res.sendStatus(200)
    } else {
      console.log(error)
    }
  })
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
