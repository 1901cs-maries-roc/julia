const findIngredients = $ => {
  const ingredients = []
  $('li').each((i, elem) => {
    const r = /ingredients/i
    const s = /^\d.+[a-z]$/
    const parentsDiv = $(elem)
      .parents('div')
      .attr('class')
    const parentsSec = $(elem)
      .parents('section')
      .attr('class')
    const el = $(elem)
      .text()
      .trim()
    if ((r.test(parentsDiv) || r.test(parentsSec)) && s.test(el)) {
      ingredients.push(
        $(elem)
          .text()
          .trim()
      )
    }
  })
  return ingredients
}

const findInstructions = $ => {
  const instructions = []
  $('li').each((i, elem) => {
    const r = /instructions|directions/i
    const parents = $(elem)
      .parents('div')
      .attr('class')
    const el = $(elem)
      .text()
      .trim()
    if (r.test(parents) && el.length) instructions.push(el)
  })
  // currently pulling in prep/cook times
  // need to check for OL parent
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
  const time = rootEl.slice(timeIndex, unitIndex)
  return rootEl[unitIndex] === 'h' ? time * 60 : time
}

const findPrepTime = $ => {
  let rootEl
  $(':contains("Prep")').each((i, elem) => {
    const r = /^(<[^>]*>)?Prep/
    if (
      r.test(
        $(elem)
          .text()
          .trim()
      )
    ) {
      rootEl = $(elem)
        .text()
        .trim()
      return false
    }
  })
  return extractTime(rootEl.slice(rootEl.search(/Prep/)))
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
      const r = /^Yield|^Makes|^Servings|servings$/
      return r.test(
        $(elem)
          .text()
          .trim()
      )
    })
    .first()
    .text()
    .trim()
  const num = /\d+/g
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
