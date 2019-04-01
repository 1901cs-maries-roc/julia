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
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import IngredientsList from './ingredientsList'
import StepNav from './recipe-step-nav'
import HelpInstructions from './help-instructions'
import Julia from './recipe-step-julia'

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
    this.props.restartSteps()
    this.props.clearCurrentRecipe()
  }

  goBack = () => {
    const stepIndex = this.props.currentStepIndex
    if (this.props.currentStepIndex === 0) {
      if (this.state.isNarrating)
        speak('You are on the first step of the recipe')
    } else {
      if (this.state.isNarrating) speak('Previous step')
      this.props.goToPrevStep(stepIndex)
    }
  }

  goToNext = () => {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps
    if (stepIndex >= steps.length - 1) {
      if (this.state.isNarrating) speak("You've reached the end of the recipe")
    } else {
      if (this.state.isNarrating) speak(steps[stepIndex + 1])
      this.props.goToNextStep(stepIndex)
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
      let commands = {
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

    return (
      <Container className="container">
        <Row>
          <Col md={{span: 8, offset: 0}}>
            <ButtonGroup>
              <Button
                variant="secondary"
                className="back-button"
                size="sm"
                onClick={this.backToRecipeOverview}
              >
                {'< Back to Recipe'}
              </Button>
              <Button variant="outline-dark" size="sm" disabled>
                {this.props.currentRecipe.name}
              </Button>
              <Button variant="outline-dark" size="sm" disabled>
                Step {stepIndex + 1} / {steps ? steps.length : 0}
              </Button>
            </ButtonGroup>
          </Col>
          <Col className="justify-content-end">
            <HelpInstructions />
          </Col>
        </Row>

        <Row className="row-grid test">
          <Col md={{span: 8, offset: 0}}>
            <div>
              <h5 id="step-instructions">{steps[stepIndex]}</h5>
            </div>
          </Col>
          <Col id="step-ing">
            <IngredientsList
              ingredients={this.props.currentRecipe.ingredients}
              instructions={steps[stepIndex]}
            />
          </Col>
        </Row>

        <Row id="bottom-nav">
          <Col md={{span: 8, offset: 0}}>
            <Julia
              listening={this.state.isListening}
              processing={this.state.isProcessingInput}
            />
          </Col>
          <Col>
            <StepNav
              stepIndex={stepIndex}
              steps={steps}
              annyang={this.annyang}
              goBack={this.goBack}
              goToNext={this.goToNext}
              stop={this.stop}
            />
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
    restartSteps: () => dispatch(restartSteps()),
    clearCurrentRecipe: () => dispatch(clearCurrentRecipe())
  }
}

export default connect(mapState, mapDispatch)(RecipeStep)
