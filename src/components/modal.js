import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: 2.5rem 2.5rem;
  display: inline-block;
  color: black;
  text-decoration: none;
  font-size: 1.5em;
`

class PhotoModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render(props) {
    return (
      <div>
        <div onClick={this.handleOpenModal}>{this.props.children}</div>

        <Modal
          isOpen={this.state.showModal}
          contentLabel="Inline Styles Modal Example"
          style={{
            overlay: {
              backgroundColor: 'black',
              zIndex: 100, // hack. for PayPal button visability under modal issue
            },
            content: {
              color: 'black',
              backgroundColor: 'black',     
              border: '0px solid black',

            },
          }}
        >
          <Link to={this.props.location} onClick={this.handleCloseModal}>
            <Img
              title={`Photo by Eghan Thompson`}
              fluid={this.props.source}
              id="mainImage"
            />
          </Link>
        </Modal>
      </div>
    )
  }
}

export default PhotoModal