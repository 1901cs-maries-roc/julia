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
      const instructions = []
      const instructionLists = $('ol').filter((i, elem) => {
        return $(elem).attr('class') !== 'comment-list'
      })

      instructionLists.find('li').each((i, elem) => {
        instructions[i] = $(elem).text()
      })
      // $('img').
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
