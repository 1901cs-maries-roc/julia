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

/**
 * ACTION CREATORS
 */
const getAllRecipes = recipes => ({type: GET_ALL_RECIPES, recipes})
const getRecipe = recipe => ({type: GET_RECIPE, recipe})
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
  const {data: recipe} = await axios.post('/api/recipes/scrape', {url})
  dispatch(addNewRecipe(recipe))
}

export const updateRecipeThunk = recipe => async dispatch => {
  try {
    const updatedRecipe = await axios.put(`/api/recipes/${recipe.id}`, recipe)
    dispatch(updateRecipe(updatedRecipe.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * INITIAL STATE
 */
const initialState = {
  recipes: [],
  recipe: {steps: []},
  currentStepIndex: 0
}

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES: {
      return {...state, recipes: action.recipes}
    }
    case GET_RECIPE: {
      return {...state, recipe: action.recipe}
    }
    case NEXT_STEP: {
      return {...state, currentStepIndex: action.nextStep}
    }
    case PREV_STEP: {
      return {...state, currentStepIndex: action.prevStep}
    }
    case RESTART_STEPS: {
      return {...state, currentStepIndex: initialState.currentStepIndex}
    }
    case ADD_NEW_RECIPE: {
      return {...state, recipe: action.recipe}
    }
    case CLEAR_CURRENT_RECIPE: {
      return {...state, recipe: initialState.recipe}
    }
    case UPDATE_RECIPE: {
      const oldRecipes = state.recipes.filter(
        recipe => recipe.id !== action.recipe.id
      )
      return {...state, recipes: [...oldRecipes, action.recipe]}
    }
    default: {
      return state
    }
  }
}
