import React, {Component} from 'react'
// import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

export default class PhotoAdd extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      image: null,
      imagePreviewUrl: null
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createPhoto({
      image: this.state.image
    })
    this.setState = {
      image: null,
      imagePreviewUrl: null
    }
  }

  handleImageChange(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
    console.log('file reader state', this.state)
  }

  render() {
    let {imagePreviewUrl} = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          src={imagePreviewUrl}
          width={171}
          height={180}
          className="img-preview"
        />
      )
    } else {
      $imagePreview = (
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src="/imgPlaceholder.svg"
        />
      )
    }
    return (
      <div>
        <form name="itemAdd" onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className="img-preview">{$imagePreview}</div>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="file"
                    onChange={e => this.handleImageChange(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}
