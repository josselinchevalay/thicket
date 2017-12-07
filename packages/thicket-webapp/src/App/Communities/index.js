import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import { Modal, Button, Input } from 'thicket-elements'
import './Communities.css'
import store from '../../database/store'
import Add from './Add'
import Card from './Card'

const { communities } = store

class Communities extends Component {

  state = { data: [], creating: false }

  componentDidMount() {
    this.fetch()
    communities.on('update', this.fetch)
  }

  componentWillUnmount() {
    communities.off('update', this.fetch)
  }

  render() {
    const { data, creating } = this.state

    return [
      (!creating || document.documentElement.clientWidth > 600) && <div className="communities" key="communities">
        <div className="communities__header">Your communities</div>
        <ul className="communities__grid" key="grid">
          <li key="new" className="communities__element">
            <Add onClick={() => this.setState({ creating: true })} />
          </li>
          {data.map(communityId => <li key={communityId} className="communities__element">
            <Link to={`/c/${communityId}`} className="communities__link">
              <Card communityId={communityId} />
            </Link>
          </li>)}
        </ul>
      </div>,
      creating && <Modal key="communities__new" className="communities__new">
        <h2 className="communities__title">Create New Community</h2>
        <h4 className="communities__message">Exciting to see you're creating a new Community on Thicket!</h4>
        <form className="communities__form" ref={f => this.form = f} onSubmit={this.onSubmit}>
          <Input key="input" placeholder="Community Title" name="title" className="communities__input" />
          <div className="communities__buttons">
            <Button type="button" className="communities__buttons"  onClick={() => this.setState({ creating: false })}>Cancel</Button>
            <Button type="submit" className="communities__buttons">Create Community</Button>
          </div>
        </form>
      </Modal>,
    ]
  }

  fetch = async () => {
    const data = await communities.getAll()
    this.setState({ data })
  }

  onSubmit = async e => {
    e.preventDefault()
    const newId = uuid()
    const community = await communities.post(newId)
    community.post({ title: this.form.elements.title.value, createdBy: this.props.nickname })
    this.setState({ creating: false })
  }

}

export default Communities
