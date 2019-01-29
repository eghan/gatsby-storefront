import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'

const Photo = styled(Img)`
  width: 100%;
  /*transform: translate(0%, -10%);*/
  @media (max-width: 750px) {
    width: 90vw;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`
const GridLeft = styled.div`
  width: 55vw;
  @media (max-width: 750px) {
    width: 100%;
  }
`
const GridRight = styled.div`
  width: 35vw;
  @media (max-width: 750px) {
    width: 100%;
  }
`
const Info = styled.div`
  font-size: 0.8em;
  padding: 1em 1em 1em 1em;
  color: black;
  text-decoration: none;
`
const Inquire = styled(Link)`
  display: none;
  @media (max-width: 750px) {
    display: inline;
  }
`
const ClickBox = styled.div`
  width: 100%;  
  /*border: 3px dashed aqua; */
`
const StyledModal = styled(Modal)`
  height: 90vh;
  left: 5vw;
  top: 5vh;
  position: fixed;
  width: 90vw;
  outline: none;
  @media (max-width: 750px) {
    left: 4vw;
    top: 5vh;
  }
`
//
// export default class OutsideClick extends Component {
//   constructor(props) {
//     super(props);
//
//     this.setWrapperRef = this.setWrapperRef.bind(this);
//     this.handleClickOutside = this.handleClickOutside.bind(this);
//   }
//
//   componentDidMount() {
//     document.addEventListener('mousedown', this.handleClickOutside);
//   }
//
//   componentWillUnmount() {
//     document.removeEventListener('mousedown', this.handleClickOutside);
//   }
//
//   /**
//    * Set the wrapper ref
//    */
//   setWrapperRef(node) {
//     this.wrapperRef = node;
//   }
//
//   /**
//    * Alert if clicked on outside of element
//    */
//   handleClickOutside(event) {
//     if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
//       alert('You clicked outside of me!');
//     }
//   }
//
//   render() {
//     return <div ref={this.setWrapperRef}>{this.props.children}</div>;
//   }
// }
//
//
//

class TextModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }

    this.handleOpenModal = this.handleOpenModal.bind(this)
    // this.handleCloseModal = this.handleCloseModal.bind(this)

    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
  setWrapperRef(node) {
    this.wrapperRef = node
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showModal: false })
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  // depriciated in this use case
  // handleCloseModal() {
  //   this.setState({ showModal: false })
  // }

  render(props) {
    return (
      <div onClick={this.handleOpenModal}>
        <ClickBox>{this.props.children}</ClickBox>

        <StyledModal
          isOpen={this.state.showModal}
          contentLabel="Inline Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              // background-color: rgba(255, 255, 255, 0.95);
              borderRadius: '15px',
              zIndex: 1000, // hack. for PayPal button visability under modal issue
            },
            content: {
              color: 'black',
              backgroundColor: 'white',
              border: '1px solid black',
              borderRadius: '15px',
              overflow: 'hidden',
              padding: '0px',                         
              margin: '0px auto',
            },
          }}
        >
          <Grid>
            <Inquire>Inquire about this piece?</Inquire>
            <GridLeft>
                <Photo
                  title={`Photo by Eghan Thompson`}
                  fluid={this.props.source}
                  id="mainImage"
                />
            </GridLeft>
            <GridRight ref={this.setWrapperRef}>
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
        </StyledModal>
      </div>
    )
  }
}

export default TextModal
