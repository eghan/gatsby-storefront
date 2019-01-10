import React from 'react'
import { navigateTo } from 'gatsby-link'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
    text-align: left;
    margin: 2rem auto;
    max-width: 90%;
`
const TextArea = styled.textarea`
    height: 200px;
    width: 80%;
`

function encode(data) {
    return Object.keys(data)
        .map(
            key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&')
}

class ContactForm extends React.Component {
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
            <Container>
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
                            <input
                                name="bot-field"
                                onChange={this.handleChange}
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Your name:
                            <br />
                            <input
                                type="text"
                                name="name"
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
                            <TextArea
                                name="message"
                                onChange={this.handleChange}
                            />
                        </label>
                    </p>
                    about photo :  {this.props.origin}
                    <br />
                    <br />
                    <p>
                        <button type="submit">Send</button>
                    </p>
                </form>
            </Container>
        )
    }
}

export default ContactForm
