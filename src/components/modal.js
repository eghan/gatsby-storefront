import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'
import { Consumer } from '../components/context'

import { Button } from '../utils/global'
// special note on static generation, Gatsby, and programatic rendering:
// dynamic image sizes and prerendering are bad at elements that are sized acording to device
// because they don't know the device when they prerender. the standard solution is to use
// media queries, this works great most of the time...
// in this case I want my Modal to fill the screen based on the largest dimension(w/h) of
// the origional source image.
// normally programatic rendering is a bad idea with static generated sites because they can
// cause an undesirable 'flickering' as the styles go from pre-rendered to programatic.
// this is not an issue with a Modal as the Modal is always a 'pop-up', and the 'flickering'
// is thereby non evident.
// caution is best as prerendering will fail if any refrence to window or document is not
// hidden behind a conditional, al-la :  if (typeof window !== `undefined`) { window.stuff? }

// console.log(width)
const Box = styled.div`
  position: relative;
  background: black;
  /*border: 2px solid pink;*/
  border-top: 22px solid black;
  width: 52vw;
  left: 24vw;
  @media (max-width: 750px) {
    left: 0;
    height: auto;
    width: auto;
  }
`
const OverlayText = styled.div`
  position: absolute;
  background: black;
  bottom: 12px;
  left: 0;
  width: 52vw;
  color: darkgray;
  padding-right: 50px;
  text-align: right;
  @media (max-width: 750px) {
    width: 100vw;
  }
`

const Element = styled.div`
  /*  border: 5px dotted purple;
    vertical-align: bottom;*/

  /*  margin: auto;
  text-align: bottom;*/
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

    const customStyles = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000, // hack. for PayPal button visability under modal issue
        // width: '80%',
      },
      content: {
        color: 'black',
        // backgroundColor: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        border: '0px solid aqua',
        // objectFit: 'contain',
        // overflow: 'hidden',
        // maxWidth: '80%',
        // height: {height},
        width: '100%', // set this to image width
        height: '100%', // set this to image heigth
        margin: '0 auto',
        padding: '0px',
        // top: '0px',
        left: '0px',
        borderRadius: '0px',
        textAlign: 'center',
      },
      // static defaultStyles = {
      //   overlay: {
      //     position: "fixed",
      //     top: 0,
      //     left: 0,
      //     right: 0,
      //     bottom: 0,
      //     backgroundColor: "rgba(255, 255, 255, 0.75)"
      //   },
      //   content: {
      //     position: "absolute",
      //     top: "40px",
      //     left: "40px",
      //     right: "40px",
      //     bottom: "40px",
      //     border: "1px solid #ccc",
      //     background: "#fff",
      //     overflow: "auto",
      //     WebkitOverflowScrolling: "touch",
      //     borderRadius: "4px",
      //     outline: "none",
      //     padding: "20px"
      //   }
      // };
    }

    // console.log(customStyles())

    const NonStretchedImage = props => {
      let normalizedProps = props

      if (props.fluid) {
        normalizedProps = {
          ...props,
          style: {
            ...(props.style || {}),
            // border: "10px solid brown",
            // width: "auto",
            height: '92vh',
            // maxWidth: "50%",
            // maxHeight: height,
            // margin: "0 auto !", // Used to center the image
            textAlign: 'center',
          },
          imgStyle: {
            // maxWidth: width,
            // maxHeight: height,
            height: '86vh',
            width: 'auto',
            margin: '0 auto', // Used to center the image
            right: '0px',
            left: '0px',
            // height: displayHeight,
            // width: displayWidth,
          },
        }
      }

      return <Img {...normalizedProps} />
    }

    return (
      <Element>
        <div onClick={this.handleOpenModal}>{this.props.children}</div>

        <Modal
          isOpen={this.state.showModal}
          ariaHideApp={false}
          contentLabel="Inline Styles Modal Example"
          style={customStyles}
        >
          <Box onClick={this.handleCloseModal}>
            <NonStretchedImage
              title={`Photo by Eghan Thompson`}
              fluid={this.props.source}
              id="modalImage"
              // imgStyle={{ ...imgStyle }}
            />
            <OverlayText>
              <Consumer>
                {({ data, set }) => {
                  if (this.props.text) {
                    return (
                      <Button
                        onClick={() => {
                          set({
                            itemInquery: [this.props.object],
                          })
                          navigate('contact')
                        }}
                      >
                        {this.props.text ? this.props.text : ''}
                      </Button>
                    )
                  }
                }}
              </Consumer>
            </OverlayText>
          </Box>
        </Modal>
      </Element>
    )
  }
}

export default PhotoModal
