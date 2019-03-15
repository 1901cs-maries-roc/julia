'use strict'

const db = require('../server/db')
const {User, Recipe, Tag} = require('../server/db/models')

const recipes = [{
  imgUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/5/25/0/BX1307H_Chocolate-Ganache-Cake_s4x3.jpg.rend.hgtvcom.826.620.suffix/1495685194371.jpeg',
  title: 'Flourless Chocolate Cake II',
  ingredients: [
    '4 (1 ounce) squares semisweet chocolate, chopped', 
    '1/2 cups butter', 
    '3/4 cup white sugar', 
    '1/2 cup cocoa powder', 
    '3 eggs beaten', 
    '1 teaspoon vanilla extract'
  ],
  serving: 8,
  prepTime: 15,
  cookTime: 30,
  waitTime: 0,
  directions: [
    '1. Preheat oven to 300 degrees F (150 degrees C). Grease an 8 inch round cake pan, and dust with cocoa powder.',
    '2. In the top of a double boiler over lightly simmering water, melt chocolate and butter.', 
    '3. Remove from heat, and stir in sugar, cocoa powder, eggs, and vanilla. Pour into prepared pan.',
    '4. Bake in preheated oven for 30 minutes.', 
    '5. Let cool in pan for 10 minutes, then turn out onto a wire rack and cool completely. Slices can also be reheated for 20 to 30 seconds in the microwave before serving.']
},
{
  imgUrl: 'https://www.monpetitfour.com/wp-content/uploads/2015/03/madeleines-2-copy-1024x683.jpg',
  title: 'Classic Madeleines Recipe',
  ingredients: [
    '2/3 cup granulated sugar',
    '3 eggs',
    '1 cup all-purpose flour',
    '1/2 tsp baking soda',
    '1/2 cup unsalted butter melted and cooled',
    '1/2 tbsp orange zest or lemon zest',
    '1 tsp vanilla extract'
  ],
  serving: 18,
  prepTime: 10,
  cookTime: 10,
  waitTime: 0,
  directions: [
        '1. Preheat the oven to 350°F and grease a madeleine pan well with nonstick baking spray or softened butter.', 
        '2. Use a handheld mixer to beat the sugar and eggs together until well-combined and pale yellow in color. Add in the flour and baking soda and quickly mix to incorporate.',
        '3. Add in the orange zest, vanilla extract, and melted butter before giving the batter a final mix to get everything combined. Use a large spoon to scoop out a heaping tablespoon worth of batter into each madeleine shell. No need to spread out the batter to fill out the mold; the batter will spread as it bakes.',
        '4. Bake the madeleines for approximately 10 minutes, or until the edges are golden brown and the centers are no longer jiggly. Cool the madeleines in the pan for a few minutes before flipping them out onto a wire cooling rack. Sprinkle powdered sugar over the madeleines just before serving.'
      ]
  },
  {
    imgUrl: 'https://cdn-image.foodandwine.com/sites/default/files/styles/medium_2x/public/201305-xl-pork-and-crab-soup-dumplings.jpg?itok=olw3tr-j',
    title: 'Pork and Crab Soup Dumplings',
    ingredients: [
        'Jellied Chicken Stock',
        'One 3-pound chicken, quartered', 
        '1 pound boneless pork shoulder, sliced', 
        '1 inch thick Eight 1/4-inch-thick slices of fresh ginger', 
        '2 scallions, halved crosswise', 
        '1 large carrot, thinly sliced', 
        '2 quarts low-sodium chicken broth', 
        '1 quart water', 
        '3 envelopes unflavored gelatin',
        'Dough',
        '4 1/2 cups all-purpose flour, plus more for dusting', 
        '1 1/2 cups bread flour Boiling water', 
        'Large pinch of saffron threads, crumbled', 
        '1 tablespoon fine sea salt',
        'Filling',
        '4 dried shiitake mushrooms Boiling water ',
        '3/4 pound ground pork shoulder',
        '1/4 cup Asian crab paste (optional; see Note) ',
        '1/2 cup finely chopped chives',
        '2 tablespoons potato starch',
        '2 tablespoons toasted sesame oil',
        '1 1/2 tablespoons dark soy sauce', 
        '1 1/2 tablespoons mushroom soy sauce, such as Healthy Boy (see Note)',
        '1 tablespoon sugar ',
        '1 teaspoon finely chopped peeled fresh ginger ',
        '3/4 teaspoon salt ',
        '1/2 teaspoon freshly ground white pepper',
        '3 cups Jellied Stock (recipe above)', 
        'Goji berries, for garnish (optional)',
        'Vinegar Dipping Sauce',
        '1/4 cup Chinese black vinegar ',
        '1 tablespoon fresh ginger, julienned'
    ],
    serving: 48,
    prepTime: 4,
    cookTime: 3.5,  //how to differentiate between minutes and hours
    waitTime: 0,
    directions: [
        '1. In a large, deep pot, combine the chicken, pork, ginger, scallions, carrot, broth and water and bring to a boil. Reduce the heat and simmer until the chicken is cooked through, about 30 minutes. Remove the chicken and, when it is cool enough to handle, pull the meat from the bones. Return the bones to the pot and simmer over moderately low heat until the broth is very flavorful and reduced to 6 cups, about 1 1/2 hours longer. Strain the stock and skim the fat from the surface. Reserve the chicken meat and pork for another use.',
        '2. In a small bowl, combine the gelatin with 1/3 cup of cold water and let stand for 5 minutes. Whisk the softened gelatin into 3 cups of the hot stock until melted. (Reserve the remaining stock for another use.) Pour the gelatinized stock into a 2-quart glass or ceramic baking dish and refrigerate until firm, at least 3 hours or overnight.',
        '3. In a medium bowl, stir 1/2 cup of the the all-purpose flour with 1/2 cup of the bread flour and 1/2 cup of boiling water until thoroughly combined. Turn the hot-water dough out onto a work surface and knead until fairly smooth, about 5 minutes.',
        '4. In a glass measuring cup, combine 2 cups of room-temperature water with the saffron and let stand for 5 minutes. In the bowl of a standing electric mixer fitted with the dough hook, blend the remaining 4 cups of all-purpose flour and 1 cup of bread flour with the salt. Add the saffron water and beat at medium speed until a smooth dough forms, about 5 minutes. Add the hot-water dough and beat at medium speed until incorporated, about 5 minutes. Turn the dough out onto a work surface and knead it into a smooth ball. Wrap the dough in plastic and let stand at room temperature for 30 minutes or refrigerate overnight.',
        '5. In a small bowl, cover the dried mushrooms with boiling water and soak until softened, about 20 minutes. Drain, squeezing out any excess liquid; discard the stems. Finely chop the caps and transfer them to the bowl of a standing electric mixer fitted with the paddle. Add the ground pork, crab paste, chives, potato starch, sesame oil, dark and mushroom soy sauces, sugar, ginger, salt and white pepper. Beat at medium speed until thoroughly combined, about 5 minutes.',
        '6. In a food processor, pulse the jellied chicken stock until finely chopped; beat into the pork mixture at medium speed until the mixture is light and fluffy, about 5 minutes.',
        '7. Cut the dough into 4 pieces. Working with one piece at a time and keeping the rest covered, roll the dough into a 1-inch-thick rope. Pinch or cut the rope into 3/4-inch pieces and roll them into balls. Then, using a small dowel, glass bottle or Chinese-style rolling pin, roll each piece of dough into a thin 3 1/2-inch round, dusting with flour as necessary. (For an alternative method, see Note.) Lightly dust the rounds with flour, transfer to a floured baking sheet and cover with a damp towel to keep them from drying out. Repeat with the remaining dough. You should have 4 dozen rounds.',
        '8. Line 2 baking sheets with wax paper and dust lightly with flour. Working with 1 dough round at a time and keeping the rest covered, spoon a well-rounded tablespoon of the filling onto the center of the round. Using your fingers, pinch and pleat the dough around the filling, leaving a tiny steam vent at the top; transfer to the baking sheet and top with a goji berry, if using. Repeat with the remaining dough and filling.',
        '9. Fill a pot with 2 inches of water and bring to a boil. Arrange the dumplings in a bamboo steamer basket in batches, leaving at least 1 inch between them. Cover and steam over the boiling water until the dough is shiny and the filling is soupy, about 5 minutes. Serve right away while you steam the remaining dumplings.'
        ]
    }



]


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  const users = await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  const recipes = await Promise.all([
    recipes.map(recipe => {
      return Recipe.create(recipe);
    })
  ])


  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${recipes.length} recipes`)
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
