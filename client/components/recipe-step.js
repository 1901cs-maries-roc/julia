import React, {Component} from 'react'
import annyang from 'annyang'

const speak = words => {
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export default class RecipeStep extends Component {
  annyang = () => {
    if (annyang) {
      var commands = {
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
    switch (command) {
      case 'repeat': {
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
