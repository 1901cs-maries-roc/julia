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

listenForCommand = event => {
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
          // event.target.setAttribute('isTrusted', true)
          const repeatRequest =
            "Sorry, I didn't get that. Can you please repeat?"
          speak(repeatRequest)
          // speechSynthesis.speak(new SpeechSynthesisUtterance(repeatRequest))
          document.getElementById('command').click()
          break
        }
      }
    }
  }
}
