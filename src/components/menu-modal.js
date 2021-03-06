import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'

import { Button, CustomsButton } from '../utils/global'

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

const MenuButton = styled(Button)`
  font-size: 1em;
`
const Box = styled.div`
  position: relative;
  background: transparent;
  left: 10vw;
  width: 80vw;
  height: 80vh;
  @media (max-width: 750px) {
    position: absolute;
    margin: auto;
    height: 90vh;
    width: 80vw;
    padding: 1em;
  }
`

const Element = styled.div`
  /*display: none;*/
  @media (max-width: 750px) {
    display: inline-block;
  }
`

class MenuModal extends React.Component {
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
        <CustomsButton
          onClick={this.props.doubleclick ? '' : this.handleOpenModal}
          onDoubleClick={this.props.doubleclick ? this.handleOpenModal : ''}
        >
          {this.props.children}
        </CustomsButton>

        <Modal
          isOpen={this.state.showModal}
          ariaHideApp={false}
          contentLabel="Inline Styles Modal"
          style={customStyles}
        >
          <Box onClick={this.handleCloseModal}>
            {this.props.categories.map(element => {
              return (
                <Button key={element} onClick={() => navigate(element[1])}>
                  {element[1] + ' (' + element[0] + ')'}
                </Button>
              )
            })}
          </Box>
        </Modal>
      </Element>
    )
  }
}

export default MenuModal
