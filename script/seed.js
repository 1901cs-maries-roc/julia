'use strict'

const db = require('../server/db')
const {User, Recipe, Ingredient} = require('../server/db/models')
const {recipeIngredient} = require('../server/db/models/index')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const [superWaffle, microwaveChocolateMugCake] = await Promise.all([
    Recipe.create({
      imgUrl:
        'https://www.kitchentreaty.com/wp-content/uploads/2017/05/vegan-vanilla-bean-waffles-image-660x430.jpg',
      name: 'Super Waffle',
      serving: 8,
      prepTime: 15,
      cookTime: 30,
      waitTime: 0,
      steps: [
        '1. Mix flour, melted butter and egg yolk',
        '2. add milk',
        '3. incorporate snow egg'
      ]
    }),
    Recipe.create({
      imgUrl:
        'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16018_Birthday-Party-Mug-Cake_600x600.jpg?ext=.jpg',
      name: 'Microwave Chocolate Mug Cake',
      serving: 1,
      prepTime: 5,
      cookTime: 2,
      waitTime: 0,
      steps: [
        '1. Mix flour, sugar, cocoa powder, baking soda, and salt in a large microwave-safe mug; stir in milk, canola oil, water, and vanilla extract.',
        '2. Cook in microwave until cake is done in the middle, about 1 minute 45 seconds.'
      ]
    })
  ])

  const [
    flour,
    butter,
    egg,
    milk,
    snowEgg,
    sugar,
    cocoaPowder,
    bakingSoda,
    salt,
    canolaOil,
    vanillaExtract,
    water
  ] = await Promise.all([
    Ingredient.create({
      name: 'Flour'
    }),
    Ingredient.create({
      name: 'Butter'
    }),
    Ingredient.create({
      name: 'Egg'
    }),
    Ingredient.create({
      name: 'Milk'
    }),
    Ingredient.create({
      name: 'Snow Egg'
    }),
    Ingredient.create({
      name: 'Sugar'
    }),
    Ingredient.create({
      name: 'Unsweetened Cocoa Powder'
    }),
    Ingredient.create({
      name: 'Baking Soda'
    }),
    Ingredient.create({
      name: 'Salt'
    }),
    Ingredient.create({
      name: 'Canola Oil'
    }),
    Ingredient.create({
      name: 'Vanilla Extract'
    }),
    Ingredient.create({
      name: 'Water'
    })
  ])

  await Promise.all([
    recipeIngredient.create({
      quantity: '500 g',
      sectionName: '',
      ingredientId: flour.id,
      recipeId: superWaffle.id
    }),
    recipeIngredient.create({
      quantity: '2 tbs',
      sectionName: '',
      ingredientId: butter.id,
      recipeId: superWaffle.id
    }),
    recipeIngredient.create({
      quantity: '2',
      sectionName: '',
      ingredientId: egg.id,
      recipeId: superWaffle.id
    }),
    recipeIngredient.create({
      quantity: '1.5 cups',
      sectionName: '',
      ingredientId: milk.id,
      recipeId: superWaffle.id
    }),
    recipeIngredient.create({
      quantity: '1',
      sectionName: '',
      ingredientId: snowEgg.id,
      recipeId: superWaffle.id
    }),
    recipeIngredient.create({
      quantity: '1/4 cup',
      sectionName: '',
      ingredientId: flour.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '1/4 cup',
      sectionName: '',
      ingredientId: sugar.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '2 tbs',
      sectionName: '',
      ingredientId: cocoaPowder.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '1/8 ts',
      sectionName: '',
      ingredientId: bakingSoda.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '1/8 ts',
      sectionName: '',
      ingredientId: salt.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '3 tbs',
      sectionName: '',
      ingredientId: milk.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '2 tbs',
      sectionName: '',
      ingredientId: canolaOil.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '1 tbs',
      sectionName: '',
      ingredientId: water.id,
      recipeId: microwaveChocolateMugCake.id
    }),
    recipeIngredient.create({
      quantity: '1/4 ts',
      sectionName: '',
      ingredientId: vanillaExtract.id,
      recipeId: microwaveChocolateMugCake.id
    })
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
