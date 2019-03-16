import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, getStepThunk} from '../store'

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
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    const stepNum = this.props.match.params.stepNum

    this.props.getRecipeThunkDispatch(recipeId)
    this.props.getStepThunkDispatch(recipeId, stepNum)
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

  command = command => {
    switch (command) {
      case 'repeat': {
        repeatStep()
        break
      }
      case 'can you repeat': {
        repeatStep()
        break
      }
      case 'repeats': {
        repeatStep()
        break
      }
      case 'ingredient': {
        listIngredients()
        break
      }
      case 'ingredients': {
        listIngredients()
        break
      }
      case 'what are the ingredients': {
        listIngredients()
        break
      }
      case 'go back': {
        goBack()
        break
      }
      case 'go back a step': {
        goBack()
        break
      }
      case 'back': {
        goBack()
        break
      }
      case 'back a step': {
        goBack()
        break
      }
      case 'previous': {
        goBack()
        break
      }
      case 'previous step': {
        goBack()
        break
      }
      case 'next': {
        goToNext()
        break
      }
      case 'next step': {
        goToNext()
        break
      }
      case 'pause': {
        pause()
        break
      }
      case 'stop': {
        pause()
        break
      }
      case 'start': {
        start()
        break
      }
      case 'resume': {
        start()
        break
      }
      default: {
        const repeatRequest = "Sorry, I didn't get that. Please try again."
        annyang.pause()
        speak(repeatRequest)
        window.setTimeout(() => {
          annyang.resume()
        }, 4000)
        break
      }
    }
  }

  render() {
    const recipeId = this.props.match.params.recipeId
    const stepNum = this.props.match.params.stepNum
    const step = this.props.currentStep
    const steps = this.props.currentRecipe.steps
    return (
      <div>
        <h1 id="title">
          Step {stepNum}/{steps ? steps.length : 0}
        </h1>
        <div>
          <button type="submit">Help</button>
        </div>
        <div id="ingredients">
          <p>Ingredients:</p>
          <ol>
            <li>ingredient 1</li>
            <li>ingredient 2</li>
            <li>ingredient 3</li>
          </ol>
        </div>
        <div id="step-instructions">
          <p>Instructions: </p>
          <p>{step}</p>
        </div>
        <div id="timer">
          <p>Timer</p>
        </div>
        <div>
          <button
            id="back"
            type="button"
            onClick={() => {
              this.props.history.push(
                `/recipes/${recipeId}/${
                  stepNum === '1' ? '' : Number(stepNum) - 1
                }`
              )
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
              this.props.history.push(
                `/recipes/${recipeId}/${Number(stepNum) + 1}`
              )
            }}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  console.log('state', state)
  return {
    currentStep: state.recipe.step,
    currentRecipe: state.recipe.recipe
  }
}

const mapDispatch = dispatch => {
  return {
    getRecipeThunkDispatch: recipeId => dispatch(getRecipeThunk(recipeId)),
    getStepThunkDispatch: (recipeId, stepNum) =>
      dispatch(getStepThunk(recipeId, stepNum))
  }
}

export default connect(mapState, mapDispatch)(RecipeStep)
