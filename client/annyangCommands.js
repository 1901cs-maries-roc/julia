import annyang from 'annyang'

export const pauseProcessing = () => {
  annyang.pause()
  speak("Sorry, I didn't get that. Please try again.")
  window.setTimeout(() => {
    // this.resumeProcessing()
    annyang.resume()
  }, 3500)
}

export const speak = words => {
  responsiveVoice.speak(words)
}

export const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

export const listIngredients = () => {
  speak(document.getElementById('ingredients').innerText)
}

export const backToRecipeOverview = () => {
  speak('Julia is now off')
  annyang.abort()
  document.getElementById('recipeOverview').click()
}

export const resume = () => {
  console.log('in resume')
  annyang.resume()
  speak('Julia is back.')
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
