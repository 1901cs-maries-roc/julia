import annyang from 'annyang'

export const stop = () => {
  responsiveVoice.cancel()
}

export const speak = words => {
  console.log('in speak', words)
  responsiveVoice.speak(words)

  // const lang = 'en-US'
  // const voiceIndex = 4

  // const getVoices = () => {
  //   return new Promise(resolve => {
  //     let voices = speechSynthesis.getVoices()
  //     if (voices.length) {
  //       resolve(voices)
  //       return
  //     }
  //     speechSynthesis.onvoiceschanged = () => {
  //       voices = speechSynthesis.getVoices()
  //       resolve(voices)
  //     }
  //   })
  // }

  // const chooseVoice = async () => {
  //   const voices = (await getVoices()).filter(voice => voice.lang == lang)

  //   return new Promise(resolve => {
  //     resolve(voices[voiceIndex])
  //   })
  // }

  // export const speak = async text => {
  //   const message = new SpeechSynthesisUtterance(text)
  //   // message.rate = 2; //not sure if this works for speed of voice
  //   // message.pitch = 1.5; // not sure if this works for pitch of voice
  //   message.voice = await chooseVoice()
  //   speechSynthesis.speak(message)
  //   console.log('in speak', message)
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
  console.log('in start')
  annyang.resume()
  speak(document.getElementById('step-instructions').innerText)
  document.getElementById('start').click()
}

export const startCooking = () => {
  console.log('in start cooking')
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

export const command = {
  //repeat
  // repeat: repeatStep,
  // 'can you repeat': repeatStep,
  // repeats: repeatStep,
  // // ingredients
  // ingredients: listIngredients,
  // ingredient: listIngredients,
  // 'what are the ingredients': listIngredients,
  // 'read ingredients': listIngredients,
  // 'read the ingredients': listIngredients,
  //back
  // back: goBack,
  // 'go back': goBack,
  // 'go back a step': goBack,
  // 'back a step': goBack,
  // previous: goBack,
  // 'previous step': goBack,
  //back to recipe overview
  // 'back to recipe': backToRecipeOverview,
  // 'back to recipe overview': backToRecipeOverview,
  // 'back to overview': backToRecipeOverview,
  //next
  // next: goToNext,
  // 'next step': goToNext,
  //off
  // stop: stop,
  // off: stop,
  //start
  // start: start,
  // instructions: start,
  // 'read steps': start,
  // 'read the steps': start,
  // steps: start,
  // 'read instructions': start,
  // 'what are the instructions': start,
  // 'please start': start,
  // resume: start
}

// export const commandCheck = action => {
//   if (command[action]) {
//     console.log('inside CommandCheck')
//     return command[action]()
//   } else {
//     const repeatRequest = "Sorry, I didn't get that. Please try again."
//     annyang.pause()
//     speak(repeatRequest)
//     window.setTimeout(() => {
//       annyang.resume()
//     }, 4000)
//   }
// }
