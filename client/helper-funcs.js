export const speak = words => {
  // event.target.setAttribute('isTrusted', true)
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

export const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

export const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export const listenForCommand = event => {
  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  // if (event.target.value === 'Click to Pause') {
  //   console.log('inside listen pause')
  //   // recognitionadd.abort()
  // }
  recognition.continuous = true
  recognition.interimResults = false
  console.log('inside ListenForCommand')
  recognition.start()
  recognition.onresult = function(event) {
    if (event.results.length > 0) {
      const result = event.results[0][0].transcript
      console.log(result)
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
          // this.repeatStep()
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
          speak(repeatRequest)
          window.setTimeout(
            () => document.getElementById('command').click,
            4000
          )
          break
        }
      }
    }
  }
}
