/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Recipe = db.model('recipe')

describe('Recipe model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('recipe', () => {
    let recipe

    beforeEach(async () => {
      recipe = await Recipe.create({
        name: 'Apple Pie',
        ingredients: ['apple', 'dough', 'love']
      })
    })

    it('returns true if the pie ingredients contain dough', () => {
      expect(recipe.ingredients.include('dough'))
    })

    it('returns false if the password is incorrect', () => {
      expect(recipe.name.to.equal('Pie'))
    })
  }) // end describe('recipe')
}) // end describe('Recipe model')
