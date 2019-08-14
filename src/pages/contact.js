import React from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { Consumer } from '../components/context'
import Img from 'gatsby-image'

const Container = styled.div`
  text-align: left;
  margin: 2rem auto;
  max-width: 90%;
`
const TextArea = styled.textarea`
  height: 200px;
  width: 80%;
`
const Photo = styled(Img)`
  width: 200px;
`

const Inquery = () => (
  <>
    <Consumer>
      {({ data }) => {
        if (data.itemInquery !== false) {
          return (
            // JSON.stringify(data.itemInquery[0].id)
            <Photo
            fadeIn={true}
            key={data.itemInquery[0].id}
            title={`Photo by Eghan Thompson`}
            fluid={data.itemInquery[0].childImageSharp.low}
          />
          )
        }
        return (
          <div>
            <h1>Test</h1>
          </div>
        )
      }}
    </Consumer>
  </>
)

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <>
        <Container>
          <Inquery />
          <h1>Contact</h1>
          <form
            name="contact"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Your name:
                <br />
                <input type="text" name="name" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Your email:
                <br />
                <input type="email" name="email" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <label>
                Message:
                <br />
                <TextArea name="message" onChange={this.handleChange} />
              </label>
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </Container>
      </>
    )
  }
}
