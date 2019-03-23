import annyang from 'annyang'

export const stop = () => {
  console.log('in stop')
  responsiveVoice.cancel()
}

export const speak = words => {
  console.log('Speaking: ', words)
  responsiveVoice.speak(words)
}

export const repeatStep = () => {
  console.log('inside repeatStep')
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
  if (document.getElementById('next').disabled) {
    return speak("You've reached the end of the recipe")
  }
  speak('Next Step')
  document.getElementById('next').click()
}

export const backToRecipeOverview = () => {
  document.getElementById('recipeOverview').click()
}

export const start = () => {
  annyang.resume()
  speak(document.getElementById('step-instructions').innerText)
  document.getElementById('start').click()
}

export const startCooking = () => {
  speak('To begin cooking, press start, then say Hey Julia, instructions')
}

export const nullCommand = () => {
  speak('How can I help you?')
}

export const help = () => {
  speak(
    'You can ask me any of the following: Repeat, Ingredients, Back, Next, or Pause.'
  )
}
