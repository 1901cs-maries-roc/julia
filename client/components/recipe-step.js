import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {
  getRecipeThunk,
  nextStep,
  prevStep,
  restartSteps,
  backToRecipeOverview
} from '../store'
import {
  nullCommand,
  help,
  repeatStep,
  goBack,
  goToNext,
  speak,
  listIngredients,
  start
} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import Portal from './portal'
// import Col from 'react-bootstrap/bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    speechSynthesis.cancel()
  }

  unrecognisedWord = () => {
    annyang.pause()

    speak("Sorry, I didn't get that. Please try again.")
    window.setTimeout(() => {
      annyang.resume()
    }, 4000)
    speechSynthesis.cancel()
  }

  componentWillUnmount = () => {
    annyang.abort()
  }
  componentWillUnmount() {
    this.props.restartRecipe()
  }

  annyang = () => {
    if (annyang) {
      var commands = {
        '(*word) hey julia': nullCommand,
        '(*word) hey julia help': help,
        '(*word) hey julia repeat': repeatStep,
        '(*word) hey julia repeats': repeatStep,
        '(*word) hey julia can you repeat': repeatStep,
        '(*word) hey julia back': goBack,
        '(*word) hey julia go back': goBack,
        '(*word) hey julia go back a step': goBack,
        '(*word) hey julia previous': goBack,
        '(*word) hey julia previous step': goBack,
        '(*word) Hey julia next': goToNext,
        '(*word) Hey julia next step': goToNext,
        '(*word) Hey julia ingredients': listIngredients,
        '(*word) Hey julia ingredient': listIngredients,
        '(*word) Hey julia what are the ingredients': listIngredients,
        '(*word) Hey julia read ingredients': listIngredients,
        '(*word) Hey julia read the ingredients': listIngredients,
        '(*word) Hey julia instructions': start,
        '(*word) Hey julia start': start,
        '(*word) Hey julia read instructions': start,
        '(*word) Hey julia what are the instructions': start,
        '(*word) Hey julia please start': start,
        '(*word) Hey julia resume': start,
        '(*word) Hey julia read steps': start,
        '(*word) Hey julia read the steps': start,
        '(*word) Hey julia steps': start,
        '(*word) Hey julia stop': stop,
        '(*word) Hey julia off': stop,
        '(*word) Hey julia back to recipe': backToRecipeOverview,
        '(*word) Hey julia back to recipe overview': backToRecipeOverview,
        '(*word) Hey julia back to overview': backToRecipeOverview,
        '(*word) Hey julia *word': this.unrecognisedWord
      }
      annyang.addCommands(commands)
      annyang.addCallback('resultMatch', function(userSaid, commandText) {
        console.log('user said: ', userSaid)
        console.log('command: ', commandText)
      })

      annyang.addCallback('error', function() {
        console.log('There was an error!')
      })

      annyang.addCallback('resultNoMatch', function() {
        console.log('Error from result no match')
        speechSynthesis.cancel()
      })

      annyang.addCallback('start', () => {
        this.setState({isListening: true})
      })
      annyang.addCallback('end', () => {
        this.setState({isListening: false})
      })
      annyang.start()
    }
  }

  handleStop = () => {
    speechSynthesis.cancel()
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []

    return (
      <Container>
        <Row>
          <Col md={{span: 4, offset: 2}}>
            <h1 id="title">
              Step {stepIndex + 1}/{steps ? steps.length : 0}
            </h1>
          </Col>
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
          <div id="ingredients">
            <p>Ingredients for this step:</p>
            <IngredientsList
              ingredients={this.props.currentRecipe.ingredients}
              instructions={steps[stepIndex]}
            />
          </div>
        </Row>
        <Row>
          <Col md={{span: 8, offset: 2}}>
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
                disabled={this.props.currentStepIndex === 0}
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
              <button
                id="pause"
                type="button"
                onClick={() => this.handleStop()}
              >
                Stop
              </button>
              <button
                id="next"
                disabled={
                  this.props.currentStepIndex >=
                  this.props.currentRecipe.steps.length - 1
                }
                type="button"
                onClick={() => this.props.goToNextStep(stepIndex)}
              >
                Next
              </button>
              <button
                id="recipeOverview"
                type="button"
                onClick={() => {
                  this.props.history.push(
                    `/recipes/${this.props.currentRecipe.id}`
                  )
                  annyang.abort()
                }}
              >
                Back to Recipe Overview
              </button>
              <button type="submit">Help</button>
            </div>
          </Col>
        </Row>
      </Container>
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
