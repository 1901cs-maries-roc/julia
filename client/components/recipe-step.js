import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, nextStep, prevStep, restartSteps} from '../store'
import {nullCommand, help, commandCheck} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import Portal from './portal'

class RecipeStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isListening: false
    }
  }
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
        'hey julia *command': commandCheck
      }
      annyang.addCommands(commands)
      annyang.addCallback('resultMatch', function(userSaid, commandText) {
        console.log(userSaid) // sample output: 'hello'
        console.log(commandText) // sample output: 'hello (there)'
      })
      annyang.addCallback('start', () => {
        this.setState({isListening: true})
      })
      annyang.addCallback('end', () => {
        this.setState({isListening: false})
      })
      annyang.start()
    }
    // speechSynthesis.cancel()
    // speechSynthesis.resume()
  }

  handlePause = () => {
    speechSynthesis.pause()
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []

    return (
      <div>
        <h1 id="title">
          Step {stepIndex + 1}/{steps ? steps.length : 0}
        </h1>
        {this.state.isListening && (
          <Portal>
            <div>
              <i className="fas fa-microphone">
                {' '}
                I am listening to you my friend :)
              </i>
            </div>
          </Portal>
        )}
        <div>
          <button type="submit">Help</button>
        </div>
        <div id="ingredients">
          <p>Ingredients for this step:</p>
          <IngredientsList
            ingredients={this.props.currentRecipe.ingredients}
            instructions={steps[stepIndex]}
          />
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
          <button id="pause" type="button" onClick={() => this.handlePause()}>
            Pause
          </button>
          <button
            id="next"
            type="button"
            onClick={() => this.props.goToNextStep(stepIndex)}
          >
            Next
          </button>
          <button
            id="recipeOverview"
            type="button"
            onClick={() => {
              this.props.history.push(`/recipes/${this.props.currentRecipe.id}`)
              this.props.restartRecipe()
              annyang.abort()
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
