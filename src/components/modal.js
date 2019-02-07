import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import  Img from 'gatsby-image'

const Photo = styled(Img)`
  margin: 0 auto;  
  width: 80vw;
`
const Element = styled.div`
  margin: auto;
  text-align: bottom;
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
      const location =
    typeof window !== `undefined` ? window.location.pathname : '/shop'

    return (
      <Element>
        <div onClick={this.handleOpenModal}>{this.props.children}</div>

        <Modal
          isOpen={this.state.showModal}
          contentLabel="Inline Styles Modal Example"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 100, // hack. for PayPal button visability under modal issue
            },
            content: {
              color: 'black',
              backgroundColor: 'black',     
              border: '0px solid black',
              objectFit: 'contain',
              // overflow: 'hidden',

            },
          }}
        >
          <Link to={this.props.location} onClick={this.handleCloseModal}>
            <Photo
              title={`Photo by Eghan Thompson`}
              fluid={this.props.source}
              id="mainImage"
            />
          </Link>
        </Modal>
      </Element>
    )
  }
}

export default PhotoModal
