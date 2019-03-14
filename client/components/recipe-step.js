import React, {Component} from 'react'

export default class RecipeStep extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>Step 1/3</h1>
        <div>
          <button type="submit">Help</button>
        </div>
        <div id="ingredients">
          <ol>
            <li>ingredient 1</li>
            <li>ingredient 2</li>
            <li>ingredient 3</li>
          </ol>
        </div>
        <div id="instruction">
          <p>step 1</p>
        </div>
        <div id="timer">
          <p>timer</p>
        </div>
        {/* conditional if bake or not at all */}
        <div id="quantities">
          <ul>
            <li>quantity 1</li>
            <li>quantity 2</li>
          </ul>
        </div>
        <div>
          <button type="button">Back</button>
          <button type="button">Repeat</button>
          <button type="button">Start/Pause</button>
          <button type="button">Next</button>
        </div>
      </div>
    )
  }
}
