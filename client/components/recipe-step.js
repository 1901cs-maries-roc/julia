import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, nextStep, prevStep} from '../store'

const speak = words => {
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

const goBack = () => {
  speak(document.getElementById('back').innerText)
}

const goToNext = () => {
  speak(document.getElementById('next').innerText)
}

const pause = () => {
  //speechSynthesisInstance.pause();
  annyang.pause()
  speak(document.getElementById('pause').innerText)
}

const start = () => {
  //speechSynthesisInstance.resume();
  annyang.resume()
  speak(document.getElementById('start').innerText)
}

class RecipeStep extends Component {
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
  }

  annyang = () => {
    if (annyang) {
      var commands = {
        'hey julia': this.nullCommand,
        'hey julia help': this.help,
        'hey julia *command': this.command
      }
      annyang.addCommands(commands)
      annyang.start()
    }
  }

  nullCommand = () => {
    const repeatRequest = 'How can I help you?'
    speak(repeatRequest)
  }

  help = () => {
    const repeatRequest =
      'You can ask me any of the following: Repeat, Ingredients, Back, Next, or Pause.'
    speak(repeatRequest)
  }

  // eslint-disable-next-line complexity
  command = command => {
    switch (command) {
      case 'repeat':
      case 'can you repeat':
      case 'repeats':
        repeatStep()
        break

      case 'ingredients':
      case 'ingredient':
      case 'what are the ingredients':
        listIngredients()
        break

      case 'back':
      case 'go back':
      case 'go back a step':
      case 'back a step':
      case 'previous':
      case 'previous step':
        goBack()
        break

      case 'next':
      case 'next step':
        goToNext()
        break

      case 'pause':
        pause()
        break

      case 'stop':
        pause()
        break

      case 'start':
        start()
        break

      case 'resume':
        start()
        break

      default: {
        const repeatRequest = "Sorry, I didn't get that. Please try again."
        annyang.pause()
        speak(repeatRequest)
        window.setTimeout(() => {
          annyang.resume()
        }, 4000)
      }
    }
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []
    const ingredients = this.props.currentRecipe.ingredients || []
    const ingredientList = ingredients.map(i => {
      return (
        <li key={i.id}>
          {i.recipeIngredient.quantity} {i.name}
        </li>
      )
    })

    return (
      <div>
        <h1 id="title">
          Step {stepIndex + 1}/{steps ? steps.length : 0}
        </h1>
        <div>
          <button type="submit">Help</button>
        </div>
        <div id="ingredients">
          <p>Ingredients:</p>
          <ol>{ingredientList}</ol>
        </div>
        <div id="step-instructions">
          <p>Instructions: </p>
          <p>{steps[stepIndex]}</p>
        </div>
        <div id="timer">
          <p>Timer</p>
        </div>
        <div>
          {stepIndex !== 0 ? (
            <button
              id="back"
              type="button"
              onClick={() => {
                this.props.goToPrevStep(stepIndex)
              }}
            >
              Back
            </button>
          ) : null}
          <button id="start" type="button" onClick={this.annyang}>
            Start
          </button>
          {/* change to resume once annyang is in componentDidMount */}
          <button id="pause" type="button">
            Pause
          </button>
          {stepIndex < steps.length - 1 ? (
            <button
              id="next"
              type="button"
              onClick={() => {
                this.props.goToNextStep(stepIndex)
              }}
            >
              Next
            </button>
          ) : null}
          <button
            id="recipeOverview"
            type="button"
            onClick={() => {
              this.props.history.push(`/recipes/${this.props.currentRecipe.id}`)
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
    goToPrevStep: currentStep => dispatch(prevStep(currentStep))
  }
}

export default connect(mapState, mapDispatch)(RecipeStep)
