import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'


const NonStretchedImage = props => {
  let normalizedProps = props
  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        // maxHeight: "50px",
        margin: "0 auto", // Used to center the image
      },
    }
  }

  return <Img {...normalizedProps} />
}

const Photo = styled(Img)`
  margin: 0 auto;  
  /*width: 80vw;*/
  /*height: 400PX;*/

  /*imgStyle:*/
`
const imgStyle = {
    // height: "50vh"
  }

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
              overflow: 'hidden',
              width: '700px',
              height: '870px',
              margin: '0 auto',
            },
          }}
        >
          <Link to={this.props.location} onClick={this.handleCloseModal}>
            <NonStretchedImage
              title={`Photo by Eghan Thompson`}
              fluid={this.props.source}
              id="mainImage"
              // imgStyle={{ ...imgStyle }}
            />
          </Link>
        </Modal>
      </Element>
    )
  }
}

export default PhotoModal
