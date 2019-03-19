import annyang from 'annyang'

export const speak = words => {
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

export const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

export const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export const goBack = () => {
  speak('Previous step')
}

export const goToNext = () => {
  speak('Next step')
}

export const pause = () => {
  annyang.pause()
  speak('How can I help you?')
}

export const start = () => {
  annyang.resume()
  speak(document.getElementById('start').innerText)
}

export const nullCommand = () => {
  speak('How can I help you?')
}

export const help = () => {
  speak(
    'You can ask me any of the following: Repeat, Ingredients, Back, Next, or Pause.'
  )
}

// eslint-disable-next-line complexity
export const command = request => {
  switch (request) {
    case 'repeat':
    case 'can you repeat':
    case 'repeats':
      repeatStep()
      break

    case 'ingredients':
    case 'ingredient':
    case 'what are the ingredients':
      listIngredients()
      break

    case 'back':
    case 'go back':
    case 'go back a step':
    case 'back a step':
    case 'previous':
    case 'previous step':
      goBack()
      break

    case 'next':
    case 'next step':
      goToNext()
      break

    case 'pause':
      pause()
      break

    case 'stop':
      pause()
      break

    case 'start':
      start()
      break

    case 'resume':
      start()
      break

    default: {
      const repeatRequest = "Sorry, I didn't get that. Please try again."
      annyang.pause()
      speak(repeatRequest)
      window.setTimeout(() => {
        annyang.resume()
      }, 4000)
    }
  }
}
