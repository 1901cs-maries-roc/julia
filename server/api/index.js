const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')

module.exports = router

router.use('/users', require('./users'))
router.use('/recipes', require('./recipes'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

router.get('/scrape', (req, res, next) => {})
