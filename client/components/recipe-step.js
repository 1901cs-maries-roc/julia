import React, {Component} from 'react'
import annyang from 'annyang'

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
  // listenForCommand = event => {
  //   const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  //   const recognition = new SpeechRecognition()

  //   recognition.continuous = true
  //   recognition.interimResults = false
  //   recognition.start()
  //   // eslint-disable-next-line complexity
  //   recognition.onresult = function(event) {
  //     if (event.results.length > 0) {
  //       const latest = Object.keys(event.results).length - 1
  //       let result = event.results[latest][0].transcript.split(' ')
  //       result = result[result.length - 1]

  //       console.log('event.results', event.results)
  //       console.log('result', result)
  //       console.log('Speaking? ', speechSynthesis.speaking)

  //       switch (result) {
  //         case 'next': {
  //           console.log('Next command')
  //           break
  //         }
  //         case 'back' || 'backed' || 'backs' || 'go back': {
  //           console.log('Back command')
  //           break
  //         }
  //         case 'repeat' || 'repeats': {
  //           console.log('Repeat command: ', result)
  //           repeatStep()
  //           break
  //         }
  //         case 'ingredients': {
  //           console.log('Ingredients command', result)
  //           listIngredients()
  //           break
  //         }
  //         default: {
  // const repeatRequest = "Sorry, I didn't get that. Please try again."
  // recognition.stop()
  // speak(repeatRequest)
  // window.setTimeout(() => {
  //   recognition.start()
  // }, 4000)
  // break
  //         }
  //       }
  //     }
  //   }
  // }

  annyang = () => {
    if (annyang) {
      var commands = {
        // 'repeat': repeatStep,
        // 'repeats': repeatStep,
        // 'ingredient': listIngredients,
        // 'ingredients': listIngredients
        'hey julia': this.nullCommand,
        'hey julia help': this.help,
        'hey julia *command': this.command
      }
      annyang.addCommands(commands)
      annyang.start()
    }
  }

  help = () => {
    const repeatRequest =
      'You can ask me any of the following: Repeat, Ingredients, Back, Next, or Pause.'
    speak(repeatRequest)
  }

  nullCommand = () => {
    const repeatRequest = 'How can I help you?'
    speak(repeatRequest)
  }

  command = command => {
    console.log('in command', `_${command}_`)
    switch (command) {
      case null: {
        console.log('in null command')
      }
      case 'repeat': {
        console.log('in repeat')
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
          <p>
            Combine flour, white sugar, baking powder and salt. In a separate
            bowl, mix together egg, milk, vegetable oil and bananas.
          </p>
        </div>
        <div id="timer">
          <p>timer</p>
        </div>
        <div>
          <button type="button">Back</button>
          <button id="command" type="button" onClick={this.annyang}>
            Start
          </button>
          {/* change to resume once annyang is in componentDidMount */}
          <button type="button">Pause</button>
          <button type="button">Next</button>
        </div>
      </div>
    )
  }
}
