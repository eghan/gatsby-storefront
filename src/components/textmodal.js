import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'

const Photo = styled(Img)`
  margin: 0 auto;
  width: 60vw;
  height: 88vh;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const GridLeft = styled.div`
  width: 60vw;
`
const GridRight = styled.div`
  width: 40vw;
`
const Info = styled.div`
  font-size: 0.8em;
  padding: 1em 1em 1em 1em;
  color: black;
  text-decoration: none;
`

class TextModal extends React.Component {
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
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 100, // hack. for PayPal button visability under modal issue
            },
            content: {
              color: 'black',
              backgroundColor: 'white',
              border: '0px solid black',
              overflow: 'hidden',
            },
          }}
        >
          <Grid>
            <GridLeft>
              <Link to={this.props.location} onClick={this.handleCloseModal}>
                <Photo
                  title={`Photo by Eghan Thompson`}
                  fluid={this.props.source}
                  id="mainImage"
                />
              </Link>
            </GridLeft>
            <GridRight>
              <Info>
                This piece has sold into a private collection.
                <br />
                <br />
                If you'd like something like this, please, drop me a line.
                <br />
                <br />
                <p>{this.props.name}</p>
              </Info>
            </GridRight>
          </Grid>
        </Modal>
      </div>
    )
  }
}

export default TextModal
