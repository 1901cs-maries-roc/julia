import annyang from 'annyang'

const voiceParams = {
  onstart: annyang.pause,
  onend: annyang.resume
}

export const unrecognized = () => {
  annyang.pause()
  speak(
    "Sorry, I didn't get that. You can say, 'Hey Julia help', for possible commands."
  )
  window.setTimeout(() => {
    annyang.resume()
  }, 3500)
}

export const speak = words => {
  responsiveVoice.speak(words, 'UK English Female', voiceParams)
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
  speak(
    'How can I help you? You can say "Hey Julia help", for possible commands.'
  )
}

export const help = () => {
  speak(
    'You can ask me any of the following: Repeat, Instructions, Ingredients, Back, Next, or Pause.'
  )
}
