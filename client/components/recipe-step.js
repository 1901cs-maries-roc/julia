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
  startCooking,
  pauseProcessing
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
      isProcessingInput: false
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
        '(*words) Hey Julia *word': pauseProcessing
      }
      annyang.addCommands(commands)

      annyang.addCallback('soundstart', () => {
        if (!responsiveVoice.isPlaying())
          this.setState({isProcessingInput: true})
        window.setTimeout(() => this.setState({isProcessingInput: false}), 3000)
      })

      annyang.addCallback('resultMatch', (userSaid, commandText) => {
        this.setState({isProcessingInput: false})
        console.log('user said: ', userSaid)
        console.log('command: ', commandText)
      })

      annyang.addCallback('resultNoMatch', userSaid => {
        this.setState({isProcessingInput: false})
        console.log('No match for this input: ', userSaid)
      })

      annyang.addCallback('error', evt => {
        if (evt.error !== 'no-speech') console.log('There was an error: ', evt)
      })

      this.setState({isListening: true})

      annyang.start({continuous: false})
    }
  }

  render() {
    console.log('Current state: ', this.state)

    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []
    const processingInputSlug = this.state.isProcessingInput ? (
      <span>
        <p className="microphone">
          <i className="fas fa-microphone fa-5x microphone-off" />
        </p>
        <h4>Thinking...</h4>
      </span>
    ) : (
      <span>
        <p className="microphone">
          <i className="fas fa-microphone fa-5x microphone-on" />
        </p>
        <h4>I'm listening</h4>
      </span>
    )

    const recipeOverview = '< Back to Recipe'

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
              {recipeOverview}
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
        </Row>
        <Row>
          <Col md={{span: 4, offset: 2}}>
            <h3>Ingredients for this step:</h3>
            <h5>
              <IngredientsList
                ingredients={this.props.currentRecipe.ingredients}
                instructions={steps[stepIndex]}
              />
            </h5>
          </Col>
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
