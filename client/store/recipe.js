import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_RECIPE = 'GET_RECIPE'
const GET_STEP = 'GET STEP'
const NEXT_STEP = 'NEXT_STEP'
const PREV_STEP = 'PREV_STEP'

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
export const nextStep = currentStep => ({
  type: NEXT_STEP,
  nextStep: currentStep + 1
})
export const prevStep = currentStep => ({
  type: PREV_STEP,
  prevStep: currentStep - 1
})

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
    case NEXT_STEP: {
      const nextIndex =
        action.nextStep < state.recipe.steps.length ? action.nextStep : null
      return {...state, currentStepIndex: nextIndex}
    }
    case PREV_STEP: {
      const nextIndex = action.prevStep >= 0 ? action.prevStep : null
      return {...state, currentStepIndex: nextIndex}
    }
    default:
      return state
  }
}
