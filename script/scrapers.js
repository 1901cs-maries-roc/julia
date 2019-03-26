const findTitle = $ => {
  const el = $('title')
    .first()
    .text()
  const r = /(\w+\S*\s?)+/
  return el.match(r)[0] || 'Recipe Name Not Found'
}

const findIngredients = $ => {
  const ingredients = []
  const ingTitleRgx = /ingredient[s]?/i
  const ingItemRgx = /^\d.+[a-z]$/
  const newLineRgx = /\r?\n|\r|\s{2,}/g
  $('li').each((i, elem) => {
    const divParentsClassName = $(elem)
      .parents('div')
      .attr('class')
    const secParentsClassName = $(elem)
      .parents('section')
      .attr('class')
    const el = $(elem)
      .text()
      .replace(newLineRgx, ' ')
      .trim()
    if (
      (ingTitleRgx.test(divParentsClassName) ||
        ingTitleRgx.test(secParentsClassName)) &&
      ingItemRgx.test(el)
    )
      ingredients.push(el)
  })
  return ingredients
}

const findInstructions = $ => {
  const instructions = []
  const instrClassRgx = /instruction[s]?|direction[s]?|preparation[s]?/i
  const newLineRgx = /\r?\n|\r|\s{2,}/g
  $('li').each((i, elem) => {
    const parents = $(elem)
      .parents('div')
      .attr('class')
    const parent = $(elem)
      .parent()
      .attr('class')
    const el = $(elem)
      .text()
      .replace(newLineRgx, ' ')
      .trim()
    if (
      instrClassRgx.test(parents) &&
      el.length &&
      $(elem).parents('ol').length === 1
    ) {
      instructions.push(el)
    } else if (instrClassRgx.test(parent) && el.length) {
      instructions.push(el)
    }
  })
  return instructions
}

const findImg = $ => {
  let imgUrl
  $('img').each((i, elem) => {
    const imgHeight = Number($(elem).attr('height'))
    const imgWidth = Number($(elem).attr('width'))
    console.log('>>Dimensions: ', imgHeight, ' x ', imgWidth)
    const r = /(?:([^:\/?#]+):)?(?:\/\/([^\/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/
    const imgToTest = $(elem).attr('data-src') || $(elem).attr('src')
    if (
      imgHeight &&
      imgHeight < imgWidth * 2 &&
      imgHeight > 300 &&
      r.test(imgToTest)
    ) {
      imgUrl = imgToTest
      return false
    }
  })
  return imgUrl
}

const extractTime = rootEl => {
  const timeRegexp = /\D*(?<hours>\d+\sh\w*)?\s?(?<min>\d+\sm\w*)?/i
  const hourStr = rootEl.match(timeRegexp).groups.hours
  const minStr = rootEl.match(timeRegexp).groups.min
  const numRegexp = /\d+/
  let hrs = 0
  let mins = 0
  if (hourStr) hrs = hourStr.match(numRegexp)[0] * 60
  if (minStr) mins = minStr.match(numRegexp)[0] * 1
  return hrs + mins
}

const findPrepTime = $ => {
  let prepTimeStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(?<timeStr>Prep\s?\w*:?\s*(\d+\s?[a-z]+\s?)+)$/
    const el = $(elem)
      .text()
      .trim()
    if (r.test(el)) {
      prepTimeStr = el.match(r).groups.timeStr
    }
  })
  return extractTime(prepTimeStr)
}

const findCookTime = $ => {
  let cookTimeStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(?<timeStr>Cook\s?\w*:?\s*(\d+\s?[a-z]+\s?)+)$/
    const el = $(elem)
      .text()
      .trim()
    if (r.test(el)) {
      cookTimeStr = el.match(r).groups.timeStr
    }
  })
  return extractTime(cookTimeStr)
}

const findTotalTime = $ => {
  let totalTimeStr = ''
  $('*').each((i, elem) => {
    const r = /^(<[^>]*>)?(Total Time|Ready In):?\s*(?<timeStr>(\d+\s?[a-z]+\s?)+)$/i
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
  const servings = servingsStr.match(num) ? servingsStr.match(num)[0] : ''
  return Number(servings)
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
