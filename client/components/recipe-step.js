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
  start
} from '../annyangCommands'
import IngredientsList from './ingredientsList'
import Portal from './portal'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Modal from 'react-bootstrap/Modal'
import Overlay from 'react-bootstrap/Overlay'

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
    responsiveVoice.cancel()
    // this.setState = {
    //   isListening: false
    // }
    console.log(this.state)
  }

  render() {
    const stepIndex = this.props.currentStepIndex
    const steps = this.props.currentRecipe.steps || []
    const julia = SpeechSynthesisUtterance.text

    return (
      <Container className="container">
        <Row>
          <Col md={{span: 4, offset: 2}}>
            <h1 id="title">
              Step {stepIndex + 1}/{steps ? steps.length : 0}
            </h1>
          </Col>
          {this.state.isListening && (
            <Portal>
              <Modal.Dialog>
                <Modal.Header closeButton onHide={this.handleStop}>
                  <Modal.Title>Julia Listening</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <i className="fas fa-microphone" />
                  <p>test</p>
                  <p>{julia}</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary">Close</Button>
                  <Button variant="primary">Save changes</Button>
                </Modal.Footer>
              </Modal.Dialog>;
            </Portal>
          )}
          <div id="ingredients">
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
          <Col md={{span: 8, offset: 2}}>
            <ButtonToolbar className="all-navigation-button">
              <Button
                className="navigation-button"
                variant="secondary"
                id="back"
                type="button"
                disabled={this.props.currentStepIndex === 0}
                onClick={() => {
                  this.props.goToPrevStep(stepIndex)
                }}
              >
                Back
              </Button>
              <Button
                className="navigation-button"
                variant="success"
                id="start"
                type="button"
                onClick={this.annyang}
              >
                Start
              </Button>
              {/* change to resume once annyang is in componentDidMount */}
              <Button
                className="navigation-button"
                variant="danger"
                id="pause"
                type="button"
                onClick={() => this.handleStop()}
              >
                Stop
              </Button>
              <Button
                className="navigation-button"
                variant="secondary"
                id="next"
                disabled={
                  this.props.currentStepIndex >=
                  this.props.currentRecipe.steps.length - 1
                }
                type="button"
                onClick={() => this.props.goToNextStep(stepIndex)}
              >
                Next
              </Button>
              <Button
                variant="secondary"
                className="navigation-button"
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
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="navigation-button"
              >
                Help
              </Button>
            </ButtonToolbar>
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
