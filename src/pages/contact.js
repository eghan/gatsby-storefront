import React from 'react'
import { navigate } from 'gatsby-link'
import styled from 'styled-components'
import { Consumer } from '../components/context'
import Img from 'gatsby-image'

import { Button } from '../utils/global'

const Container = styled.div`
border: 1px solid dimgray;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  margin: 1em auto 5em auto;
  max-width: 80vw;
`
const GridLeft = styled.div`
  display: grid;
  padding: .7em;
  grid-area: 1/1;
`
const GridRight = styled.div`
  display: grid;
  text-align: left;
  padding: 1em;
  grid-area: 1/2;
`
const SubmitButton = styled(Button)`
  font-size: 1em;
`

const Title = styled.div`
  margin: auto;
  text-align: center;
  padding: 1.5em 0 0 0;
`
const ImageAlert = styled.div`
  margin: 3em;
  text-align: center;
  padding: 1em;
`
const TextArea = styled.textarea`
  height: 200px;
  width: 100%;
`
const Photo = styled(Img)`
  width: 30vw;
  margin: auto;
  border: 1px solid black;
`

let imageTargetURL = typeof window !== `undefined` ? window.location.origin : ''

const Inquery = () => (
  <>
    <Consumer>
      {({ data }) => {
        if (data.itemInquery !== false) {
          imageTargetURL = data.itemInquery[0].childImageSharp.low.src
          return (
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
            <ImageAlert>
              You can contact me about a specific photo by using the
              <Button>inquiry</Button> button under the image(click to zoom), in
              the <Button onClick={() => navigate('gallery')}>Gallery</Button>{' '}
              or <Button>Home</Button> pages
            </ImageAlert>
          </div>
        )
      }}
    </Consumer>
  </>
)

function encode(data) {
  let encoded = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
  return encoded
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    if (e.target.name === 'message') {
      this.setState({
        [e.target.name]: e.target.value + ' REF is ' + imageTargetURL,
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    // console.log(JSON.stringify(this.state))
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <>
        <Title>Contact form:</Title>
        <form
          name="contact"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          <Container>
            <GridLeft>
              <Inquery />
            </GridLeft>
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <GridRight>
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
                  <input
                    type="text"
                    name="contact_name"
                    onChange={this.handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Your email:
                  <br />
                  <input
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </label>
              </p>
              <p>
                <label>
                  Message:
                  <br />
                  <TextArea name="message" onChange={this.handleChange} />
                </label>
                <label>
                  <br />
                </label>
              </p>
              <p>
                <SubmitButton type="submit">Send</SubmitButton>
              </p>
            </GridRight>
          </Container>
        </form>
      </>
    )
  }
}
