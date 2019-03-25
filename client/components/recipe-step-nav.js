import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
// import HelpInstructions from './help-instructions'

export default function StepNav({
  stepIndex,
  steps,
  annyang,
  goBack,
  goToNext,
  stop
}) {
  return (
    <Row>
      {/* <Col md={{span: 8, offset: 2}}> */}
      <ButtonToolbar className="all-navigation-button">
        <Button
          className="navigation-button"
          variant="secondary"
          id="back"
          type="button"
          disabled={stepIndex === 0}
          onClick={goBack}
        >
          Back
        </Button>
        <Button
          className="navigation-button"
          variant="success"
          id="start"
          type="button"
          onClick={annyang}
        >
          Start
        </Button>
        <Button
          className="navigation-button"
          variant="danger"
          id="pause"
          type="button"
          onClick={stop}
        >
          Stop
        </Button>
        <Button
          className="navigation-button"
          variant="secondary"
          id="next"
          disabled={stepIndex >= steps.length - 1}
          type="button"
          onClick={goToNext}
        >
          Next
        </Button>
        {/* <Button variant="secondary" type="submit" className="navigation-button">
            Help
          </Button> */}
        {/* <HelpInstructions /> */}
      </ButtonToolbar>
      {/* </Col> */}
    </Row>
  )
}
