import React, {Component} from 'react'
import {connect} from 'react-redux'
import annyang from 'annyang'
import {
  getRecipeThunk,
  nextStep,
  prevStep,
  restartSteps,
  clearCurrentRecipe
} from '../store'
import {
  nullCommand,
  help,
  repeatStep,
  speak,
  listIngredients,
  resume,
  unrecognized
} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import StepNav from './recipe-step-nav'
import Portal from './portal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HelpInstructions from './help-instructions'

class RecipeStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // Is the microphone on
      isListening: false,
      // Is annyang processing inputs
      isProcessingInput: false,
      isNarrating: false
    }
  }

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId
    this.props.getRecipe(recipeId)
    responsiveVoice.speak(
      'To begin cooking, press start, then say Hey Julia, instructions'
    )
  }

  componentWillUnmount = () => {
    annyang.abort()
    responsiveVoice.speak('Bon appetit! Julia is now off.')
    this.props.restartRecipe()
    clearCurrentRecipe()
  }

  goBack = () => {
    const stepIndex = this.props.currentStepIndex
    if (this.props.currentStepIndex === 0) {
      this.state.isNarrating && speak('You are on the first step of the recipe')
    } else {
      this.state.isNarrating && speak('Previous step')
      this.props.goToPrevStep(stepIndex)
    }
  }

  goToNext = () => {
    if (
      this.props.currentStepIndex >=
      this.props.currentRecipe.steps.length - 1
    ) {
      this.state.isNarrating && speak("You've reached the end of the recipe")
    } else {
      const stepIndex = this.props.currentStepIndex
      const steps = this.props.currentRecipe.steps
      this.props.goToNextStep(stepIndex)
      this.state.isNarrating && speak(steps[stepIndex + 1])
    }
  }

  backToRecipeOverview = () => {
    this.props.history.push(`/recipes/${this.props.currentRecipe.id}`)
  }

  stop = () => {
    responsiveVoice.cancel()
    annyang.abort()
    responsiveVoice.speak('Julia is now paused. To resume, press start again.')
    this.setState({isListening: false, isNarrating: false})
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
        '(*words) Hey Julia *word': unrecognized
      }
      annyang.addCommands(commands)

      annyang.addCallback('soundstart', () => {
        if (!responsiveVoice.isPlaying()) {
          // if user is speaking
          this.setState({isProcessingInput: true})
        }
        window.setTimeout(() => this.setState({isProcessingInput: false}), 3000)
      })

      annyang.addCallback('resultMatch', (userSaid, commandText) => {
        console.log('user said: ', userSaid)
        console.log('command: ', commandText)
      })

      annyang.addCallback('resultNoMatch', userSaid => {
        console.log('No match for this input: ', userSaid)
      })

      annyang.addCallback('error', evt => {
        if (evt.error !== 'no-speech') console.log('There was an error: ', evt)
      })

      this.setState({isListening: true, isNarrating: true})
      annyang.start({autoRestart: true, continuous: false})
    }
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []
    const processingInputSlug = this.state.isProcessingInput ? (
      <p className="microphone">
        <i className="fas fa-microphone fa-2x microphone-off" />
        <span className="micro-text">Thinking...</span>
      </p>
    ) : (
      <p className="microphone">
        <i className="fas fa-microphone fa-2x microphone-on" />
        <span className="micro-text">I'm listening</span>
      </p>
    )

    const recipeOverview = '< Back to Recipe'

    return (
      <Container className="container">
        <Row>
          <Col md={{span: 7, offset: 1}}>
            <Button
              variant="outline-dark"
              id="recipeOverview"
              type="button"
              className="back-button"
              size="sm"
              onClick={this.backToRecipeOverview}
            >
              {recipeOverview}
            </Button>
          </Col>
          <Col className="justify-content-end" md={{span: 3, offset: 1}}>
            <HelpInstructions />
          </Col>
        </Row>
        <Row>
          <Col md={{span: 5, offset: 1}}>
            <h1>{this.props.currentRecipe.name}</h1>
          </Col>
          <Col md={{span: 3, offset: 2}}>
            <h1 id="title">
              Step {stepIndex + 1}/{steps ? steps.length : 0}
            </h1>
          </Col>
          {this.state.isListening && (
            <Portal>
              <Modal.Dialog id="modal" className="sm">
                <Modal.Body scrollable="true">{processingInputSlug}</Modal.Body>
              </Modal.Dialog>;
            </Portal>
          )}
        </Row>
        <Row className="row-grid test">
          <Col md={{span: 5, offset: 1}}>
            <div>
              <h3>Instructions:</h3>
              <h5 id="step-instructions">{steps[stepIndex]}</h5>
            </div>
          </Col>

          <Col md={{span: 5, offset: 1}}>
            <h3>Ingredients for this step:</h3>
            <h5>
              <IngredientsList
                ingredients={this.props.currentRecipe.ingredients}
                instructions={steps[stepIndex]}
              />
            </h5>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
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
