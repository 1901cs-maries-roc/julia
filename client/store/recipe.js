import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_RECIPE = 'GET_RECIPE'
const GET_STEP = 'GET STEP'

/**
 * INITIAL STATE
 */
const initialState = {
  recipes: [],
  recipe: {},
  currentStepIndex: 0
}

/**
 * ACTION CREATORS
 */
const getAllRecipes = recipes => ({type: GET_ALL_RECIPES, recipes})
const getRecipe = recipe => ({type: GET_RECIPE, recipe})
const getStep = step => ({type: GET_STEP, step})

/**
 * THUNK CREATORS
 */
export const getAllRecipesThunk = () => async dispatch => {
  try {
    const recipes = await axios.get('/api/recipes/')
    dispatch(getAllRecipes(recipes.data))
  } catch (err) {
    console.error(err)
  }
}

export const getRecipeThunk = recipeId => async dispatch => {
  try {
    const recipe = await axios.get(`/api/recipes/${recipeId}`)
    dispatch(getRecipe(recipe.data))
  } catch (err) {
    console.error(err)
  }
}

export const getStepThunk = (recipeId, stepNum) => async dispatch => {
  try {
    const step = await axios.get(`/api/recipes/${recipeId}/${stepNum}`)
    dispatch(getStep(step.data || defaultRecipe))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {...state, recipes: action.recipes}
    case GET_RECIPE:
      return {...state, recipe: action.recipe}
    case GET_STEP:
      return {...state, currentStepIndex: action.step}
    default:
      return state
  }
}
