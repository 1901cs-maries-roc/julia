const findTitle = $ => {
  let title = ''
  const el = $('title')
    .first()
    .text()
  const r = /(\w+\s?)+/
  title = el.match(r)[0]
  return title
}

const findIngredients = $ => {
  const ingredients = []
  $('li').each((i, elem) => {
    const r = /ingredient[s]?/i
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
      ingredients.push(el)
    }
  })
  return ingredients
}

const findInstructions = $ => {
  const instructions = []
  $('li').each((i, elem) => {
    const r = /instruction[s]?|direction[s]?/i
    const parents = $(elem)
      .parents('div')
      .attr('class')
    const el = $(elem)
      .text()
      .trim()
    if (r.test(parents) && el.length) instructions.push(el)
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
  let time = null
  const num = /\d/
  const unit = /\sm|\sh/
  const timeIndex = rootEl.search(num)
  const unitIndex = rootEl.search(unit) + 1
  time = rootEl.slice(timeIndex, unitIndex)
  return rootEl[unitIndex] === 'h' ? time * 60 : time
}

const findPrepTime = $ => {
  let rootEl
  $(':contains("Prep")').each((i, elem) => {
    const el = $(elem)
      .text()
      .trim()
    const r = /^(<[^>]*>)?Prep/
    if (r.test(el)) {
      rootEl = el
      return false
    }
  })
  return extractTime(rootEl.slice(rootEl.search(/Prep/)))
}

const findCookTime = $ => {
  let totalTimeStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(?<timeStr>Cook\s?\w*?:?\s?\d+\s?[a-z]+$)/i
    const el = $(elem)
      .text()
      .trim()
    if (r.test(el)) {
      totalTimeStr = el.match(r).groups.timeStr
    }
  })
  return extractTime(totalTimeStr)
}

const findTotalTime = $ => {
  let totalTimeStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(?<timeStr>(Total Time|Ready In):?\s?\d+\s?[a-z]+$)/i
    const el = $(elem)
      .text()
      .trim()
    if (r.test(el)) {
      totalTimeStr = el.match(r).groups.timeStr
    }
  })
  return extractTime(totalTimeStr)
}

const findServings = $ => {
  let servingsStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(?<servStr>(\d+\s?servings)|((Yield[s]?|Makes|Servings|Serves):?\s?.*\d+))/i
    const el = $(elem)
      .text()
      .trim()
    if (r.test(el)) {
      servingsStr = el.match(r).groups.servStr
      return false
    }
  })
  const num = /\d+/g
  return servingsStr.match(num) ? servingsStr.match(num)[0] : ''
}

module.exports = {
  findTitle,
  findImg,
  findPrepTime,
  findCookTime,
  findTotalTime,
  findIngredients,
  findInstructions,
  findServings
}
