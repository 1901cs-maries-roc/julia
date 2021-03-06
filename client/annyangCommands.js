import annyang from 'annyang'

const voiceEvts = {
  onstart: annyang.pause,
  onend: annyang.resume
}

export const speak = words => {
  responsiveVoice.speak(words, 'UK English Female', voiceEvts)
}

export const unrecognized = () => {
  speak(
    "Sorry, I didn't get that. You can say, 'Hey Julia help', for possible commands."
  )
}

export const repeatStep = () => {
  speak(document.getElementById('step-instructions').innerText)
}

export const listIngredients = () => {
  speak(document.getElementById('ingredients-list').innerText)
}

export const resume = () => {
  annyang.resume()
  speak('Julia is back.')
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
