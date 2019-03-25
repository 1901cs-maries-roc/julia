import annyang from 'annyang'

export const browserCompatibility = () => {
  let speechSyn = responsiveVoice.voiceSupport()

  if (!annyang) {
    return 'Speech Recognition is not supported'
  } else if (!speechSyn) {
    return 'Your browser does not support speech synthesis. Please use Julia in Chrome, Firefox or Safari'
  } else if (!annyang && !speechSyn) {
    return 'Your browser does not support speech recognition and speech synthesis. Please use Julia in Chrome, Firefox or Safari'
  }
  return null
}

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
  speak(document.getElementById('ingredients').innerText)
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
