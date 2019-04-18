import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_RECIPE = 'GET_RECIPE'
const NEXT_STEP = 'NEXT_STEP'
const PREV_STEP = 'PREV_STEP'
const RESTART_STEPS = 'RESTART_STEPS'
const ADD_RECIPE = 'ADD_RECIPE'
const ADD_NEW_RECIPE = 'ADD_NEW_RECIPE'
const CLEAR_CURRENT_RECIPE = 'CLEAR_CURRENT_RECIPE'
const UPDATE_RECIPE = 'UPDATE_RECIPE'
const DELETE_RECIPE = 'DELETE_RECIPE'
const ADD_BY_URL_ERROR = 'ADD_BY_URL_ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

/**
 * ACTION CREATORS
 */
export const getAllRecipes = recipes => ({type: GET_ALL_RECIPES, recipes})
export const getRecipe = recipe => ({type: GET_RECIPE, recipe})
export const nextStep = currentStep => ({
  type: NEXT_STEP,
  nextStep: currentStep + 1
})
export const prevStep = currentStep => ({
  type: PREV_STEP,
  prevStep: currentStep - 1
})
export const restartSteps = () => ({type: RESTART_STEPS})
export const clearCurrentRecipe = () => ({type: CLEAR_CURRENT_RECIPE})
// export const addRecipe = recipe => ({type: ADD_RECIPE, recipe})
export const addNewRecipe = recipe => ({type: ADD_NEW_RECIPE, recipe})
export const updateRecipe = recipe => ({type: UPDATE_RECIPE, recipe})
export const deleteRecipe = () => ({type: DELETE_RECIPE})
export const addByUrlError = () => ({
  type: ADD_BY_URL_ERROR,
  error: 'Error in scraping'
})
export const clearError = () => ({type: CLEAR_ERROR})

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

export const addRecipeThunk = recipe => async dispatch => {
  try {
    const newRecipe = await axios.post('/api/recipes', recipe)
    dispatch(addNewRecipe(newRecipe.data))
  } catch (err) {
    console.error(err)
  }
}

export const addRecipeFromUrl = url => async dispatch => {
  const {data: recipe, status} = await axios.post('/api/recipes/scrape', {url})
  if (status === 200) dispatch(addNewRecipe(recipe))
  else dispatch(addByUrlError())
}

export const updateRecipeThunk = recipe => async dispatch => {
  try {
    const updatedRecipe = await axios.put(`/api/recipes/${recipe.id}`, recipe)
    dispatch(updateRecipe(updatedRecipe.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteRecipeThunk = recipeId => async dispatch => {
  await axios.delete(`/api/recipes/${recipeId}`)
  dispatch(deleteRecipe())
}

/**
 * INITIAL STATE
 */
const initialState = {
  recipes: [],
  recipe: {steps: []},
  currentStepIndex: 0,
  error: ''
}

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {...state, recipes: action.recipes}
    case GET_RECIPE:
      return {...state, recipe: action.recipe}
    case NEXT_STEP:
      return {...state, currentStepIndex: action.nextStep}
    case PREV_STEP:
      return {...state, currentStepIndex: action.prevStep}
    case UPDATE_RECIPE: {
      return {...state, recipe: action.recipe}
    }
    case DELETE_RECIPE:
      return {...state, recipe: initialState.recipe}
    case RESTART_STEPS:
      return {...state, currentStepIndex: initialState.currentStepIndex}
    case ADD_RECIPE:
      return {...state, recipes: [...state.recipes, action.recipe]}
    case ADD_NEW_RECIPE:
      return {...state, recipe: action.recipe}
    case CLEAR_CURRENT_RECIPE:
      return {...state, recipe: initialState.recipe}
    case ADD_BY_URL_ERROR:
      return {...state, error: action.error}
    case CLEAR_ERROR:
      return {...state, error: initialState.error}
    default:
      return state
  }
}
