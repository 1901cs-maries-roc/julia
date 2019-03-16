import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RECIPE = 'GET_RECIPE'

/**
 * INITIAL STATE
 */
const defaultRecipe = {}

/**
 * ACTION CREATORS
 */
const getRecipe = recipe => ({type: GET_RECIPE, recipe})

/**
 * THUNK CREATORS
 */
export const getRecipeThunk = recipeId => async dispatch => {
  try {
    const recipe = await axios.get(`/api/recipes/${recipeId}`)
    dispatch(getRecipe(recipe.data || defaultRecipe))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultRecipe, action) {
  switch (action.type) {
    case GET_RECIPE:
      return action.recipe
    default:
      return state
  }
}
