import React from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { Consumer } from '../components/context'
import Img from 'gatsby-image'

const Container = styled.div`
  text-align: center;
  margin: 1em auto 5em auto;
  max-width: 90%;
`
const Title = styled.div`
  padding: 0 1em 0 1em;
`
const ImageAlert = styled.div`
  font-size: 0.8em;
  padding: 1em;
`
const TextArea = styled.textarea`
  height: 200px;
  width: 80%;
`
const Photo = styled(Img)`
  width: 200px;
  margin: auto;
  padding: 5.2em;
  border: 1px solid black;
`

let imageTargetURL = typeof window !== `undefined` ? window.location.origin : ''

const Inquery = () => (
  <>
    <Consumer>
      {({ data }) => {
        if (data.itemInquery !== false) {
          imageTargetURL += data.itemInquery[0].childImageSharp.low.src
          return (
            <>
              <Photo
                fadeIn={true}
                key={data.itemInquery[0].id}
                title={`Photo by Eghan Thompson`}
                fluid={data.itemInquery[0].childImageSharp.low}
              />
            </>
          )
        }
        return (
          <div>
            <ImageAlert>
              You can also contact me about a specific photo by using the
              inquery button under the image
            </ImageAlert>
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
          <Title>Contact form:</Title>

          <form
            name="contact"
            method="post"
            action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            <Inquery />
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
              <label>
                Message:
                <br />
                <TextArea name="message2" onChange={this.handleChange}> message area two</TextArea>
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
