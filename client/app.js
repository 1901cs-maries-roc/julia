import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

class App extends React.Component {
  constructor() {
    super()
    this.speak = this.speak.bind(this)
    this.listen = this.listen.bind(this)
  }

  speak(event) {
    event.target.setAttribute('isTrusted', true)
    speechSynthesis.speak(new SpeechSynthesisUtterance(event.target.value))
  }

  listen(event) {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    if (event.target.value === 'Click to Pause') {
      console.log('inside listen pause')
      // recognitionadd.abort()
    }
    recognition.continuous = true
    recognition.interimResults = true
    recognition.start()
    recognition.onresult = function(event) {
      if (event.results.length > 0) {
        // q.value = event.results[0][0].transcript;
        console.log(event.results)
        // q.form.submit();
      }
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        {
          <form>
            <input type="search" id="q" name="q" size={60} />
            <input type="button" value="Click to Speak" onClick={this.speak} />
            <input
              type="button"
              value="Click to Listen"
              onClick={this.listen}
            />
            <input type="button" value="Click to Pause" onClick={this.listen} />
          </form>
        }
      </div>
    )
  }
}

export default App

// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// let speech = new SpeechRecognition()
// alert('This website uses speech recognition')
// speech.start()
// var msg = new SpeechSynthesisUtterance('Hello World');
// window.speechSynthesis.speak(msg);
// console.log('hey')
