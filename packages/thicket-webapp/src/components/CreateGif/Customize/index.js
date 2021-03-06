import React, { Component } from 'react'
import { Styles, Button, Input, Modal } from 'thicket-elements'
import './Customize.css'

const { linearGradient } = Styles

class Customize extends Component {

  constructor(props) {
    super(props)
    this.state = { caption: '', nickname: props.nickname }
  }

  render() {
    return <Modal disableBodyScroll className="customize__modal">
      <div
        data-test="customize"
        className="customize"
        style={{ background: linearGradient }}
      >
        <img
          className="customize__img"
          src={this.props.src}
          alt={this.state.caption}
        />
        <div className="customize__inner">
          <h3>Save your GIF!</h3>
          <label className="customize__label">
            Change nickname? <span className="customize__span">(Optional)</span>
            <Input
              data-test="customize-nickname"
              value={this.state.nickname}
              onChange={e => this.setState({ nickname: e.target.value })}
            />
          </label>
          <label className="customize__label">
            Give your GIF a caption:
            <Input
              data-test="customize-caption"
              value={this.state.caption}
              onChange={e => this.setState({ caption: e.target.value })}
            />
          </label>
          <div className="customize__controls">
            <div className="customize__btn">
              <Button
                data-test="customize-submit"
                className="customize__submit"
                onClick={this.onSubmit}
              >
                Save
              </Button>
            </div>
            <div className="customize__btn">
              <Button
                secondary
                onClick={this.props.onRetake}
              >
                Retake
              </Button>
            </div>
            <div className="customize__btn">
              <Button
                secondary
                onClick={this.props.onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  }

  onSubmit = () => {
    this.props.onSubmit({
      src: this.props.src,
      caption: this.state.caption,
      nickname: this.state.nickname
    })
  }
}

export default Customize
