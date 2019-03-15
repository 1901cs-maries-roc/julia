import React, {Component} from 'react'
// import { speak, repeatStep, listIngredients, listenForCommand } from '../helper-funcs'

const speak = words => {
  // event.target.setAttribute('isTrusted', true)
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export default class RecipeStep extends Component {
  constructor() {
    super()
  }

  listenForCommand = event => {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = false
    recognition.start()
    // eslint-disable-next-line complexity
    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        const latest = Object.keys(event.results).length - 1
        let result = event.results[latest][0].transcript.split(' ')
        result = result[result.length - 1]

        console.log('event.results', event.results)
        console.log('result', result)
        console.log('Speaking? ', speechSynthesis.speaking)

        switch (result) {
          case 'next': {
            console.log('Next command')
            break
          }
          case 'back' || 'backed' || 'backs' || 'go back': {
            console.log('Back command')
            break
          }
          case 'repeat' || 'repeats': {
            console.log('Repeat command: ', result)
            repeatStep()
            break
          }
          case 'ingredients': {
            console.log('Ingredients command', result)
            listIngredients()
            break
          }
          default: {
            const repeatRequest = "Sorry, I didn't get that. Please try again."
            recognition.stop()
            speak(repeatRequest)
            window.setTimeout(() => {
              recognition.start()
            }, 4000)
            break
          }
        }
      }
    }
  }

  annyang

  render() {
    return (
      <div>
        <h1>Step 1/3</h1>
        <div>
          <button type="submit">Help</button>
        </div>
        <div id="ingredients">
          <ol>
            <li>ingredient 1</li>
            <li>ingredient 2</li>
            <li>ingredient 3</li>
          </ol>
        </div>
        <div id="step-instructions">
          <p>step 1</p>
        </div>
        <div id="timer">
          <p>timer</p>
        </div>
        {/* conditional if bake or not at all */}
        <div id="quantities">
          <ul>
            <li>quantity 1</li>
            <li>quantity 2</li>
          </ul>
        </div>
        <div>
          <button type="button">Back</button>
          <button
            id="command"
            type="button"
            value="Click to Give Command"
            onClick={this.listenForCommand}
          >
            Give Command
          </button>
          <button type="button">Start/Pause</button>
          <button type="button">Next</button>
        </div>
      </div>
    )
  }
}
