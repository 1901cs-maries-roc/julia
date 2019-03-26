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
        'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/roast_leg_of_lamb_with_37180_16x9.jpg',
      name: 'Roast Leg Of Lamb With Mint Jus',
      serving: 6,
      prepTime: 30,
      cookTime: 120,
      totalTime: 150,
      ingredients: [
        '2kg/4lb 8oz leg of lamb on the bone',
        '6 garlic cloves, quartered',
        '8 anchovies, halved',
        'salt and freshly ground black pepper',
        '1 tsp olive oil',
        '2 onions, roughly chopped',
        '3 carrots, roughly chopped',
        '4 sticks celery, roughly chopped',
        '1 bay leaf',
        'sprig thyme',
        '200ml/7fl oz white wine',
        '500ml/18fl oz lamb or chicken stock',
        '1 tbsp mint-flavoured vinegar',
        '100g/3½oz butter',
        '½ bunch chopped mint'
      ],
      steps: [
        'Preheat the oven to 410F(210C)/370F(190C) Fan/Gas 6.',
        'Make small incisions all over the lamb and stud each with a piece of garlic or anchovy. Season the leg well with salt and freshly ground black pepper.',
        'Heat a large pan over a high heat, add 1 tsp olive oil and fry the leg of lamb until browned all over.',
        'Put the chopped onions, carrots, celery, bay leaf and thyme into a roasting tray. Place the browned lamb on top.',
        'Deglaze the pan in which the lamb was cooked with a splash of water, scraping up all the browned bits, and pour in the roasting tray. Roast in the oven for about an hour (the internal temperature will be 55C for rare and 60-65 for medium).',
        'When cooked to your liking, remove the lamb from the oven, cover with foil and set aside in a warm place.',
        'To make the jus, place the roasting tray on the hob and heat until the juices are bubbling or the pan is hot. Add the white wine and simmer until the volume of the liquid is reduced by two-thirds. Add the stock simmer until reduced by half.',
        'Strain the sauce through a sieve into a clean pan. Add the mint vinegar and whisk in the butter until it is completely melted and the sauce is velvety. Finish with chopped mint. Transfer to a warmed jug to serve.',
        'Carve the lamb into slices, and serve with roast potatoes and seasonal vegetables.'
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
    },
    {
      imgUrl:
        'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/cheese_straws_40324_16x9.jpg',
      name: 'Easy Cheese Straws',
      serving: 6,
      prepTime: 30,
      cookTime: 20,
      totalTime: 50,
      ingredients: [
        '300g/10½ oz all-butter puff pastry',
        '4 egg yolks, beaten with a splash of water',
        '150g/5½ oz cheddar, grated',
        'paprika, for sprinkling'
      ],
      steps: [
        'Preheat the oven to 390F(200C)/360F(180C) Fan/Gas 6. Line two baking sheets with baking parchment or greaseproof paper.',
        'Roll out the pastry to a 30cm/12in square.',
        'Using a pastry brush, brush the egg mixture all over the pastry. Sprinkle over the cheese and press down lightly. Cover with cling film and chill the dough in the fridge for 15 minutes.',
        'Sprinkle the cheese with paprika, cut in half, then cut each half into 1cm/½in strips.',
        'Twist each strip into a cheese straw shape and place onto the lined baking sheet.',
        'Bake for 15 minutes, or until golden-brown and crisp.'
      ]
    },
    {
      imgUrl:
        'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/floating-islands-with-caramel-sauce.jpg?itok=AH-JOXHz',
      name: 'Floating Island',
      serving: 6,
      prepTime: 35,
      cookTime: 20,
      totalTime: 55,
      ingredients: [
        '750ml/1⅓ pint milk',
        '1 vanilla pod, seeds only',
        '8 free-range egg yolks',
        '190g/7oz caster sugar',
        '500ml/18fl oz milk',
        '1 tbsp caster sugar',
        '8 free-range egg whites',
        '190g/7oz caster sugar',
        '75g/2½oz caster sugar'
      ],
      steps: [
        'For the crème anglaise, heat the milk and vanilla seeds in a saucepan over a medium heat. Simmer for 4-5 minutes.',
        'Whisk together the egg yolks and sugar in a mixing bowl.',
        'Pour the hot milk mixture onto the eggs and sugar, a little at a time, so the eggs do not start to cook, whisking continuously until smooth and creamy.',
        'Return the mixture to the saucepan and place the pan over a medium heat and stir continuously for 4-5 minutes, or until the mixture has thickened enough to coat the back of a spoon.',
        'Strain the mixture through a sieve into a bowl, leave to cool and then refrigerate.',
        'For the poaching liquor, combine the milk and 500ml/18fl oz water with the sugar in a saucepan, stirring to dissolve the sugar.',
        'For the meringue, using an electric hand whisk, whisk the whites in a bowl until stiff peaks form when the whisk is removed, but the mixture should not look too dry. Add one tablespoon of the sugar to the egg whites, and continue to whisk until the mixture comes back to stiff peaks. Add the sugar one tablespoon at a time until it has all been used, and the meringue is thick and glossy.',
        'Using a serving spoon dipped in cold water, shape big quenelles of the meringue and gently poach in the milk and water solution, turning after 4-5 minutes to ensure they are cooked on both sides. Make sure the liquid doesn’t boil or the meringues will puff then collapse. When fully cooked, gently place on a wire rack to drain.',
        'For the caramel, pour the sugar into a clean pan. Melt the sugar slowly, stirring with a wooden spoon over a low heat until the sugar turns a dark copper colour. Remove immediately from the heat to ensure the caramel does not burn.',
        'Pour the caramel over the meringues. When set, take the caramel-covered meringues off the tray and serve in a generous pool of the crème anglaise.'
      ]
    },
    {
      imgUrl:
        'https://static01.nyt.com/images/2016/12/05/dining/05COOKING-CHOCOLATECHIPCOOKIES1/05COOKING-CHOCOLATECHIPCOOKIES1-articleLarge.jpg',
      name: 'Double Chocolate Cookies',
      serving: 4,
      prepTime: 30,
      cookTime: 20,
      totalTime: 55,
      ingredients: [
        '125g/4½oz butter, softened, roughly chopped',
        '1 free-range egg yolk',
        '60g/2¼oz soft brown sugar',
        '1 tbsp honey',
        'pinch salt',
        '130g/4¾oz plain flour',
        '45g/1½ oz cocoa powder',
        'pinch baking powder',
        '100g/3½oz white chocolate, broken into pieces'
      ],
      steps: [
        'Preheat the oven to 390F(200C)/350F(180C) Fan/Gas 4 and line a baking tray with baking paper.',
        'In a large bowl, beat the butter, egg yolk, sugar, honey and salt together until smooth.',
        'Gradually sift in the flour, cocoa powder and baking powder and mix until smooth, but be careful not to overwork the mixture. Add the white chocolate and combine.',
        'Roll the dough into a cylinder roughly 3cm/1¼in in diameter. Wrap in baking paper and refrigerate for 45 minutes, or until firm.',
        'Cut the roll into 5mm/¼in slices and place on the baking tray, leaving a gap between the cookies.',
        'Bake for 15 minutes; they should still be a little soft when you remove them from the oven. Leave to cool slightly before serving.'
      ]
    },
    {
      imgUrl:
        'https://realfood.tesco.com/media/images/RFO-Beef-Stew-Christmas-1400x919px-ea654646-3f9b-4b82-bdd1-7e1d8257d8f0-0-1400x919.jpg',
      name: 'Beef Stew in Red Wine Sauce',
      serving: 4,
      prepTime: 60,
      cookTime: 100,
      totalTime: 160,
      ingredients: [
        '1 tablespoon unsalted butter',
        '2 tablespoons olive oil',
        '2 pounds trimmed beef flatiron steak or chuck, cut into 8 pieces',
        'Salt',
        'Freshly ground black pepper',
        '1 cup finely chopped onion',
        '1 tablespoon finely chopped garlic',
        '1 tablespoon all-purpose flour',
        'One 750-milliliter bottle dry red wine',
        '2 bay leaves',
        '1 thyme sprig',
        'One 5-ounce piece of pancetta',
        '15 pearl or small cipollini onions, peeled',
        '15 cremini mushrooms',
        '15 baby carrots, peeled',
        'Sugar',
        'Chopped fresh parsley, for garnish'
      ],
      steps: [
        'Preheat the oven to 350°. In a large enameled cast-iron casserole, melt the butter in 1 tablespoon of the olive oil. Arrange the meat in the casserole in a single layer and season with salt and pepper. Cook over moderately high heat, turning occasionally, until browned on all sides, 8 minutes. Add the chopped onion and garlic and cook over moderate heat, stirring occasionally, until the onion is softened, 5 minutes. Add the flour and stir to coat the meat with it. Add the wine, bay leaves and thyme, season with salt and pepper and bring to a boil, stirring to dissolve any brown bits stuck to the bottom of the pot.',
        'Cover the casserole and transfer it to the oven. Cook the stew for 1 1/2 hours, until the meat is very tender and the sauce is flavorful.',
        'Meanwhile, in a saucepan, cover the pancetta with 2 cups of water and bring to a boil. Reduce the heat and simmer for 30 minutes. Drain the pancetta and slice it 1/2 inch thick, then cut the slices into 1-inch-wide lardons.',
        'In a large skillet, combine the pancetta, pearl onions, mushrooms and carrots. Add the remaining 1 tablespoon of olive oil, 1/4 cup of water and a large pinch each of sugar, salt and pepper. Bring to a boil, cover and simmer until almost all of the water has evaporated, 15 minutes. Uncover and cook over high heat, tossing, until the vegetables are tender and nicely browned, about 4 minutes.',
        'To serve, stir some of the vegetables and lardons into the stew and scatter the rest on top as a garnish. Top with a little chopped parsley and serve.'
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
