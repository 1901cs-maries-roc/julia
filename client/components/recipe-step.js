import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, nextStep, prevStep, restartSteps} from '../store'
import {
  nullCommand,
  backToRecipeOverview,
  help,
  repeatStep,
  goBack,
  goToNext,
  speak,
  listIngredients,
  start,
  stop,
  startCooking
} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import StepNav from './recipe-step-nav'
import Portal from './portal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'

class RecipeStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Is the microphone on
      isListening: false,

      // Is annyang processing inputs
      isProcessingInput: true
    }
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
    // speechSynthesis.cancel()
    startCooking()
  }

  componentWillUnmount = () => {
    speak('Julia is now off')
    annyang.abort()
    this.props.restartRecipe()
  }

  goBack = () => {
    if (this.props.currentStepIndex === 0) {
      speak('You are on the first step of the recipe')
    } else {
      speak('Previous step')
      const stepIndex = this.props.currentStepIndex
      this.props.goToPrevStep(stepIndex)
    }
  }

  goToNext = () => {
    if (
      this.props.currentStepIndex >=
      this.props.currentRecipe.steps.length - 1
    ) {
      speak("You've reached the end of the recipe")
    } else {
      speak('Next Step')
      const stepIndex = this.props.currentStepIndex
      this.props.goToNextStep(stepIndex)
    }
  }

  backToRecipeOverview = () => {
    this.props.history.push(`/recipes/${this.props.currentRecipe.id}`)
    annyang.abort()
  }

  annyang = () => {
    if (annyang) {
      var commands = {
        '(*word) hey julia': nullCommand,
        '(*word) hey julia help': help,
        '(*word) hey julia (can you) repeat(s)': repeatStep,
        '(*word) hey julia back': {
          regexp: /hey (Julia|Julian|Juliet) (back|bach|previous step)$/,
          callback: this.goBack
        },
        '(*word) Hey julia next': {
          regexp: /hey (Julia|Julian|Juliet) next ?(step)?$/,
          callback: this.goToNext
        },
        '(*word) Hey julia (*action) ingredient(s)': listIngredients,
        '(*word) Hey julia (*action) instruction(s)': start,
        '(*word) Hey julia (*action) start': start,
        '(*word) Hey julia (*action) steps': start,
        '(*word) Hey julia resume': start,
        '(*word) Hey julia stop': stop,
        '(*word) Hey julia off': stop,
        '(*word) Hey julia back to *overview': this.backToRecipeOverview,
        '(*word) Hey julia *word': this.unrecognisedWord
      }
      annyang.addCommands(commands)

      annyang.addCallback('resultMatch', function(userSaid, commandText) {
        console.log('user said: ', userSaid)
        console.log('command: ', commandText)
      })

      annyang.addCallback('error', function(evt) {
        if (evt.error !== 'no-speech') console.log('There was an error: ', evt)
      })

      annyang.addCallback('resultNoMatch', function(userSaid) {
        console.log('No match for this input: ', userSaid)
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

  render() {
    console.log('Current state: ', this.state)

    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []
    const processingInputSlug = this.state.isProcessingInput ? (
      <span>
        <p className="microphone">
          <i className="fas fa-microphone fa-5x microphone-on" />
        </p>
        <h4>Listening...</h4>
      </span>
    ) : (
      <span>
        <p className="microphone">
          <i className="fas fa-microphone fa-5x microphone-off" />
        </p>
        <h4>Wait a moment</h4>
      </span>
    )

    return (
      <Container className="container">
        <Row>
          <Col md={{span: 4, offset: 2}}>
            <Button
              variant="outline-dark"
              id="recipeOverview"
              type="button"
              className="back-button"
              size="sm"
              onClick={this.backToRecipeOverview}
            >
              Recipe Overview
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md={{span: 4, offset: 2}}>
            <h1 id="title">
              Step {stepIndex + 1}/{steps ? steps.length : 0}
            </h1>
          </Col>
          {this.state.isListening && (
            <Portal>
              <Modal.Dialog id="modal">
                <Modal.Body>{processingInputSlug}</Modal.Body>
              </Modal.Dialog>;
            </Portal>
          )}
          <div>
            <h3>Ingredients for this step:</h3>
            <h5>
              <IngredientsList
                ingredients={this.props.currentRecipe.ingredients}
                instructions={steps[stepIndex]}
              />
            </h5>
          </div>
        </Row>
        <Row className="row-grid">
          <Col md={{span: 8, offset: 2}}>
            <div>
              <h3>Instructions:</h3>
              <h5 id="step-instructions">{steps[stepIndex]}</h5>
            </div>
          </Col>
        </Row>
        <Row className="row-grid">
          <StepNav
            stepIndex={stepIndex}
            steps={steps}
            annyang={this.annyang}
            goBack={this.goBack}
            goToNext={this.goToNext}
          />
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
