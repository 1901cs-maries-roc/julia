'use strict'

const db = require('../server/db')
const {User, Recipe} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const users = [
    {email: 'cody@email.com', password: '123'},
    {email: 'murphy@email.com', password: '123'}
  ]
  const recipes = [
    {
      imgUrl:
        'https://www.kitchentreaty.com/wp-content/uploads/2017/05/vegan-vanilla-bean-waffles-image-660x430.jpg',
      name: 'Super Waffle',
      serving: 8,
      prepTime: 15,
      cookTime: 30,
      totalTime: 45,
      steps: [
        'Preheat your waffle maker.',
        'If the coconut milk is solidified, place it into a small saucepan and set over low heat. Heat just until liquid, but not warm.',
        'Pour coconut milk into a large mixing bowl. Scrape the pulp of the vanilla bean into the coconut milk (discard the pod) or add vanilla bean paste or extract. Stir to combine.',
        'Add the flour, sugar, baking powder, and salt. Stir gently with a wooden spoon just until combined (if you overmix, you risk making the waffles tough; don’t worry, a few lumps are okay).',
        'Spray your preheated waffle maker with cooking spray, if using. Pour batter into your waffle maker according to manufacturer instructions, as waffle makers vary. My waffle maker takes a heaping 1/3 cup per side.',
        'Cook until golden brown, as per your individual waffle maker.',
        'Serve with pure maple syrup, butter (or vegan butter), fresh berries, or anything else you’d like!'
      ],
      ingredients: [
        '1 (14-ounce) can full-fat coconut milk (about 1 3/4 cups)',
        '1 vanilla bean, split and scraped -or- 2 teaspoons vanilla bean paste',
        '1 1/2 cups all-purpose flour',
        '1/3 cup granulated sugar',
        '2 teaspoons baking powder',
        '1/4 teaspoon salt',
        'Your favorite cooking spray, if needed'
      ]
    },
    {
      imgUrl:
        'https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16018_Birthday-Party-Mug-Cake_600x600.jpg?ext=.jpg',
      name: 'Chocolate Mug Cake',
      serving: 1,
      prepTime: 5,
      cookTime: 2,
      totalTime: 7,
      steps: [
        'Mix flour, sugar, cocoa powder, baking soda, and salt in a large microwave-safe mug; stir in milk, canola oil, water, and vanilla extract.',
        'Cook in microwave until cake is done in the middle, about 1 minute 45 seconds.'
      ],
      ingredients: [
        '1/4 cup all-purpose flour',
        '1/4 cup white sugar',
        '2 tablespoons unsweetened cocoa powder',
        '1/8 teaspoon baking soda',
        '1/8 teaspoon salt',
        '3 tablespoons milk',
        '2 tablespoons canola oil',
        '1 tablespoon water',
        '1/4 teaspoon vanilla extract'
      ]
    },
    {
      imgUrl:
        'https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-733x1027.jpg',
      name: 'BEST Homemade Mac N Cheese',
      serving: 12,
      prepTime: 20,
      cookTime: 30,
      totalTime: 60,
      steps: [
        'Preheat oven to 350F. Lightly grease a large 3 qt or 4 qt baking dish and set aside.Combine shredded cheeses in a large bowl and set aside.',
        'Cook the pasta one minute shy of al dente according to the package instructions. Remove from heat, drain, and place in a large bowl.',
        'Drizzle pasta with olive oil and stir to coat pasta. Set aside to cool while preparing cheese sauce.',
        'Melt butter in a deep saucepan, dutch oven, or stock pot.',
        'Whisk in flour over medium heat and continue whisking for about 1 minute until bubbly and golden.',
        'Gradually whisk in the milk and heavy cream until nice and smooth. Continue whisking until you see bubbles on the surface and then continue cooking and whisking for another 2 minutes. Whisk in salt and pepper.',
        'Add two cups of shredded cheese and whisk until smooth. Add another two cups of shredded cheese and continue whisking until creamy and smooth. Sauce should be nice and thick.',
        'Stir in the cooled pasta until combined and pasta is fully coated with the cheese sauce.',
        'Pour half of the mac and cheese into the prepared baking dish. Top with remaining 2 cups of shredded cheese and then the remaining mac and cheese.',
        'In a small bowl, combine panko crumbs, Parmesan cheese, melted butter and paprika. Sprinkle over the top and bake until bubbly and golden brown, about 30 minutes. Serve immediately.'
      ],
      ingredients: [
        '16 oz elbow macaroni, cooked (or other tubular pasta)',
        '1 tbsp extra virgin olive oil',
        '6 tbsp unsalted butter',
        '1/3 cup all purpose flour',
        '3 cups whole milk',
        '1 cup heavy whipping cream',
        '4 cups sharp cheddar cheese shredded',
        '2 cups Gruyere cheese shredded',
        'salt and pepper to taste',
        '1 1/2 cups panko crumbs',
        '4 tbsp butter melted',
        '1/2 cup Parmesan cheese shredded',
        '1/4 tsp smoked paprika (or regular paprika)'
      ]
    },
    {
      imgUrl:
        'https://assets.epicurious.com/photos/5c7d6ee0d6c37575ccdd79c3/6:4/w_620%2Ch_413/SMALL-PLATES-Chickpea-Flatbread-recipe-27022019.jpg',
      name: 'Chickpea Flatbreads with Burst Tomato Sauce',
      serving: 4,
      prepTime: 0,
      cookTime: 15,
      totalTime: 35,
      ingredients: [
        '1 cup chickpea flour',
        '10 Tbsp. extra-virgin olive oil, divided, plus more for serving',
        '1 1/2 tsp. kosher salt, divided',
        '2 pints cherry tomatoes, halved if large',
        '2 garlic cloves, finely chopped',
        '1 (15-oz.) can chickpeas, drained, rinsed',
        '1 Tbsp. dried oregano',
        '1 tsp. sherry or red wine vinegar',
        '1/4 tsp. smoked paprika (optional)',
        '2 Tbsp. cold unsalted butter, cut into pieces',
        '1 cup coarsely crumbled feta (about 5 oz.)',
        'Baby greens, such as arugula, kale, or spinach, and lemon wedges (for serving)'
      ],
      steps: [
        'Place a rack in top third of oven; preheat to 450°F. Whisk chickpea flour, 2 Tbsp. oil, 1 tsp. salt, and 1 cup water in a medium bowl or large measuring cup until combined. Let sit at least 10 minutes and up to 1 hour to let flour hydrate.',
        'Heat 2 Tbsp. oil in a 12" cast-iron skillet over high until shimmering. Pour in exactly half (3/4 cup) of the chickpea batter and tilt to evenly coat skillet. Transfer to oven and bake flatbread until edges are golden brown, 8–10 minutes. Using a large spatula, transfer flatbread to a wire rack. Repeat with remaining batter.',
        'Meanwhile, cook tomatoes, garlic, 1/4 cup oil, and remaining 1/2 tsp. salt in a large skillet over medium-high heat, stirring occasionally, until tomatoes begin to burst, 4–5 minutes. Stir in chickpeas, oregano, vinegar, and paprika (if using). Reduce heat to medium and continue to cook, stirring often, until tomatoes have burst more into a fully formed sauce, 3–4 minutes. Remove from heat and stir in butter.',
        'Slice flatbreads in half. Serve with tomato-chickpea mixture, feta, greens, and lemon wedges alongside for squeezing and oil for drizzling.'
      ]
    },
    {
      imgUrl:
        'https://ottolenghi.co.uk/media/catalog/product/cache/1/thumbnail/321x/9df78eab33525d08d6e5fb8d27136e95/r/o/roasted-parsnip-and-stilton-1300x1300.jpg',
      name:
        'Roast Parsnips And Jerusalem Artichokes With Cavolo Nero And Stilton',
      serving: 8,
      prepTime: 30,
      cookTime: 20,
      totalTime: 40,
      ingredients: [
        '6 parsnips, peeled, trimmed and cut into 7cm-long and 2cm-wide wedges',
        '3 red onions, peeled and cut into 3cm-wide wedges',
        '60 ml olive oil',
        '3 garlic cloves, peeled and crushed',
        '5 g picked thyme leaves',
        'Salt and freshly ground black pepper',
        '700 g jerusalem artichokes, peeled and cut into 3cm-wide wedges ',
        '220 g cavolo nero, stalks removed and discarded (or saved for something else – they’re great parboiled, then put in a gratin), to leave 110 g leaves, cut into 4cm-wide slices ',
        '80 g stilton, roughly crumbled into 1cm pieces',
        '115 g pickled walnuts, roughly chopped, plus 3 tbsp pickling liquor',
        '60 g walnuts, roughly chopped',
        '15g parsley leaves, roughly chopped',
        '2 tbsp olive oil'
      ],
      steps: [
        'Heat the oven to 220C/425F/gas mark 7. Put the parsnips and onions in a medium bowl with two tablespoons of oil, two garlic cloves, the thyme, half a teaspoon of salt and lots of pepper. Spread out on a large oven tray lined with greaseproof paper. Put the artichokes on a separate lined tray, mixed with a tablespoon of oil, a quarter-teaspoon of salt and plenty of pepper. Roast both trays for 20 minutes, until the parsnips and onions are cooked and caramelised, and the artichokes are just cooked through, then tip both into a large bowl and keep warm.',
        'Mix the dressing ingredients with a third of a teaspoon of salt and set aside until required.',
        'Bring a medium saucepan of water to a boil, add the cavolo nero and blanch for two minutes. Drain, refresh under cold water and pat dry.',
        'Put the final tablespoon of oil in a large frying pan on a high heat, then fry the remaining garlic clove until just starting to brown; about 30 seconds. Add the cavolo nero and an eighth of a teaspoon of salt, and fry for four to five minutes, stirring often, until it starts to brown. Add to the veg bowl and, just before serving, gently mix in the dressing. Spread out on a large platter, sprinkle over the stilton and take to the table.'
      ]
    }
  ]

  await Promise.all(users.map(user => User.create(user)))

  await Promise.all(recipes.map(recipe => Recipe.create(recipe)))

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
