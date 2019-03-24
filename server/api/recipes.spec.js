/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Recipe = db.model('recipe')

describe('Recipe routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/recipes/', () => {
    const recipeName = 'Apple Fritter'

    beforeEach(() => {
      return Recipe.create({
        name: recipeName
      })
    })

    it('GET /api/recipes', async () => {
      const res = await request(app)
        .get('/api/recipes')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(recipeName)
    })
  }) // end describe('/api/recipes')
}) // end describe('Recipe routes')
