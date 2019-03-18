import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, nextStep, prevStep, restartSteps} from '../store'
import {nullCommand, help, command} from '../annyangCommands'
import IngredientsList from './ingredientsList'

class RecipeStep extends Component {
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
  }

  componentDidUpdate() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps
    document.getElementById('next').disabled = stepIndex === steps.length - 1
    document.getElementById('back').disabled = stepIndex === 0
  }

  annyang = () => {
    if (annyang) {
      var commands = {
        'hey julia': nullCommand,
        'hey julia help': help,
        'hey julia *command': command
      }
      annyang.addCommands(commands)
      annyang.start()
    }
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []

    return (
      <div>
        <h1 id="title">
          Step {stepIndex + 1}/{steps ? steps.length : 0}
        </h1>
        <div>
          <button type="submit">Help</button>
        </div>
        <div>
          <p>Ingredients:</p>
          <IngredientsList ingredients={this.props.currentRecipe.ingredients} />
        </div>
        <div>
          <p>Instructions: </p>
          <p id="step-instructions">{steps[stepIndex]}</p>
        </div>
        <div id="timer">
          <p>Timer</p>
        </div>
        <div>
          <button
            id="back"
            type="button"
            onClick={() => {
              this.props.goToPrevStep(stepIndex)
            }}
          >
            Back
          </button>
          <button id="start" type="button" onClick={this.annyang}>
            Start
          </button>
          {/* change to resume once annyang is in componentDidMount */}
          <button id="pause" type="button">
            Pause
          </button>
          <button
            id="next"
            type="button"
            onClick={() => {
              this.props.goToNextStep(stepIndex)
            }}
          >
            Next
          </button>
          <button
            id="recipeOverview"
            type="button"
            onClick={() => {
              this.props.history.push(`/recipes/${this.props.currentRecipe.id}`)
              this.props.restartRecipe()
            }}
          >
            Back to Recipe Overview
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentStepIndex: state.recipe.currentStepIndex,
    currentRecipe: state.recipe.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    getRecipe: recipeId => dispatch(getRecipeThunk(recipeId)),
    goToNextStep: currentStep => dispatch(nextStep(currentStep)),
    goToPrevStep: currentStep => dispatch(prevStep(currentStep)),
    restartRecipe: () => dispatch(restartSteps())
  }
}

export default connect(mapState, mapDispatch)(RecipeStep)
