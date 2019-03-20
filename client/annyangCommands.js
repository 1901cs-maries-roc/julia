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
  console.log('in start')
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

export const command = {
  //repeat
  repeat: repeatStep,
  'can you repeat': repeatStep,
  repeats: repeatStep,
  // ingredients
  ingredients: listIngredients,
  ingredient: listIngredients,
  'what are the ingredients': listIngredients,
  //back
  back: goBack,
  'go back': goBack,
  'go back a step': goBack,
  'back a step': goBack,
  previous: goBack,
  'previous step': goBack,
  //next
  next: goToNext,
  'next step': goToNext,
  //pause
  pause: pause,
  //off
  stop: pause,
  //start
  start: start,
  instructions: start,
  'read instructions': start,
  'what are the instructions': start,
  'please start': start,
  resume: start
}

export const commandCheck = action => {
  for (let key in command) {
    if (key === action) {
      return command[action]()
    } else {
      const repeatRequest = "Sorry, I didn't get that. Please try again."
      annyang.pause()
      speak(repeatRequest)
      window.setTimeout(() => {
        annyang.resume()
      }, 4000)
    }
  }
}
