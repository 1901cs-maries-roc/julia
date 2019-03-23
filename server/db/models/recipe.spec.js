/* global describe beforeEach it */

const {expect} = require('chai')
const should = require('chai').should()
const db = require('../index')
const Recipe = db.model('recipe')

describe('The Recipe model', () => {
  // clears the database and recreates the tables before beginning a run
  beforeEach(() => {
    return db.sync({force: true})
  })

  // creates an (un-saved) recipe instance before every spec
  let recipe
  beforeEach(() => {
    recipe = Recipe.build({
      name: 'Apple Pie',
      imgUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71Cf3MCaeaL._SX425_.jpg',
      serving: 8,
      prepTime: 15,
      cookTime: 30,
      totalTime: 60,
      ingredients: ['5 apples', '1 lb dough', '100 g love'],
      steps: [
        'slice apples',
        'roll dough into pan',
        'sprinkle with love',
        'bake until golden brown'
      ]
    })
  })

  // empty the test after each test
  afterEach(() => {
    return Promise.all([Recipe.truncate({cascade: true})])
  })

  describe('attributes definition', () => {
    it('includes `name`, `imgUrl`, `serving`, `prepTime`, `cookTime`, `totalTime`, `ingredients`, and `steps` fields', async () => {
      describe('attribute definitions', () => {
        expect(recipe.name).to.equal('Apple Pie')
        recipe.name.should.be.a('string')
        expect(recipe.imgUrl).to.equal(
          'https://images-na.ssl-images-amazon.com/images/I/71Cf3MCaeaL._SX425_.jpg'
        )
        expect(recipe.serving).to.equal(8)
        recipe.serving.should.be.a('number')
        expect(recipe.prepTime).to.equal(15)
        expect(recipe.cookTime).to.equal(30)
        expect(recipe.totalTime).to.equal(60)
        expect(recipe.ingredients).to.deep.equal([
          '5 apples',
          '1 lb dough',
          '100 g love'
        ])
        recipe.ingredients.should.be.a('array')
        expect(recipe.steps).to.deep.equal([
          'slice apples',
          'roll dough into pan',
          'sprinkle with love',
          'bake until golden brown'
        ])
        recipe.steps.should.be.a('array')
      })

      describe('validations', () => {
        it('requires `name`', async () => {
          recipe.name = null

          let result, error
          try {
            result = await recipe.validate()
          } catch (err) {
            error = err
          }

          if (result) throw Error('validation should fail when name is null')
          expect(error).to.be.an.instanceOf(Error)
        })
      })
    })
  })
})
