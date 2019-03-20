import annyang from 'annyang'

// const CommandMap = {}

// export const addCommand = (name, func) => {
//   CommandMap[name] = func
// }

export const pause = () => {
  speak(document.getElementById('pause').innerText)
  document.getElementById('pause').click()
}

export const speak = words => {
  console.log('in speak')
  speechSynthesis.speak(new SpeechSynthesisUtterance(words))
}

export const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

export const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export const goBack = () => {
  if (document.getElementById('back').disabled) {
    speak('You are on the first step of the recipe')
  } else {
    speak('Previous step')
    document.getElementById('back').click()
  }
}

export const goToNext = () => {
  // CommandMap.NEXT_STEP()
  if (document.getElementById('next').disabled) {
    return speak("You've reached the end of the recipe")
  }
  speak('Next Step')
  document.getElementById('next').click()
}

export const backToRecipeOverview = () => {
  speak('Julia is now off')
  annyang.abort()
  document.getElementById('recipeOverview').click()
}

export const start = () => {
  annyang.resume()
  speak(document.getElementById('step-instructions').innerText)
  document.getElementById('start').click()
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
    case 'instructions':
    case 'read instructions':
    case 'what are the instructions':
    case 'please start':
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
