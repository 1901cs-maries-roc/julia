import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {getRecipeThunk, nextStep, prevStep, restartSteps} from '../store'
import {
  nullCommand,
  help,
  repeatStep,
  speak,
  listIngredients,
  resume,
  startCooking
} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import StepNav from './recipe-step-nav'
import Portal from './portal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
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
  }

  stop = () => {
    responsiveVoice.cancel()
    annyang.pause()
    this.setState({isListening: false})
    speak('Julia is now paused. To resume, press start again.')
  }

  annyang = () => {
    if (annyang) {
      var commands = {
        '(*words) (hey) Julia': nullCommand,
        '(*words) (hey) Julia help': help,
        '(*words) (hey) Julia (can you) repeat(s)': repeatStep,
        '(*words) (hey) Julia back': {
          regexp: /(hey)? ?(Julia|Julian|Juliet) (back|Bach|previous step)$/,
          callback: this.goBack
        },
        '(*words) (Hey) Julia next': {
          regexp: /(hey)? ?(Julia|Julian|Juliet) next ?(step)?$/,
          callback: this.goToNext
        },
        '(*words) (Hey) Julia (*action) ingredient(s)': listIngredients,
        '(*words) (Hey) Julia (*action) instruction(s)': repeatStep,
        '(*words) (Hey) Julia pause': {
          regexp: /(hey)? ?(Julia|Julian|Juliet) (pause|stop|off)$/,
          callback: this.stop
        },
        '(*words) (Hey) Julia resume': resume,
        '(*words) (Hey) Julia back to *overview': this.backToRecipeOverview,
        '(*words) (Hey) Julia *word': this.unrecognisedWord
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
        console.log('annyang in START')
      })

      annyang.addCallback('end', () => {
        console.log('annyang in END')
      })

      this.setState({isListening: true})

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
            stop={this.stop}
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
