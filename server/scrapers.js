const findIngredients = $ => {
  const ingredients = []
  const ingredientsLabel = $('*')
    .filter((i, elem) => {
      const r = /^ingredients/i
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .first()

  ingredientsLabel
    .find('ul')
    .children('li')
    .each((i, elem) => {
      const ingredient = $(elem).text()
      if (!isNaN(ingredient[0])) ingredients[i] = ingredient.trim()
    })

  return ingredients
}

const findInstructions = $ => {
  const instructions = []
  const instructionLists = $('ol').filter((i, elem) => {
    return $(elem).attr('class') !== 'comment-list'
  })
  instructionLists.find('li').each((i, elem) => {
    instructions[i] = $(elem).text()
  })
  return instructions
}

const findImg = $ => {
  let imgUrl
  $('img').each((i, elem) => {
    const imgHeight = Number($(elem).attr('height'))
    const imgWidth = Number($(elem).attr('width'))
    if (imgHeight < imgWidth * 2 && imgHeight > 300) {
      imgUrl = $(elem).attr('data-src') || $(elem).attr('src')
      return false
    }
  })
  return imgUrl
}

const extractTime = rootEl => {
  const num = /\d/
  const unit = /\sm|\sh/
  const timeIndex = rootEl.search(num)
  const unitIndex = rootEl.search(unit) + 1
  // console.log(">>rootEL: ", rootEl)
  // console.log(">>time/unit: ", rootEl[timeIndex], "/", rootEl[unitIndex])
  const time = rootEl.slice(timeIndex, unitIndex)
  return rootEl[unitIndex] === 'h' ? time * 60 : time
}

const findPrepTime = $ => {
  const rootEl = $(':contains("Prep")')
    .filter((i, elem) => {
      const r = /^Prep/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  return extractTime(rootEl)
}

const findCookTime = $ => {
  const rootEl = $(':contains("Cook")')
    .filter((i, elem) => {
      const r = /^Cook\s|^Cook\d/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  return extractTime(rootEl)
}

const findTotalTime = $ => {
  const rootElA = $(':contains("Total Time")')
    .filter((i, elem) => {
      const r = /^Total Time/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()

  const rootElB = $(':contains("Ready In")')
    .filter((i, elem) => {
      const r = /^Ready In/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .text()
    .trim()
  const rootEl = rootElA || rootElB
  return extractTime(rootEl)
}

const findServings = $ => {
  const rootEl = $('*')
    .filter((i, elem) => {
      const r = /^Yield|^Makes|^Servings/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .first()
    .text()
    .trim()
  const num = /\d\d*/g
  console.log('rootEl: ', rootEl)
  console.log('TEST: ', rootEl.match(num))
  const servings = rootEl.match(num) ? rootEl.match(num)[0] : null
  return servings
}

module.exports = {
  findImg,
  findPrepTime,
  findCookTime,
  findTotalTime,
  findIngredients,
  findInstructions,
  findServings
}
