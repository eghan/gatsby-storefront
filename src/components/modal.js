 import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'
import Img from 'gatsby-image'

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
// console.log(this.props.fluid)
  const width = (typeof window !== `undefined`) 
    ? (window.innerWidth > width ? (width+"px") : (window.innerWidth+"px")) 
    : "auto"
  const height = (typeof window !== `undefined`) 
    ? (window.innerHeight > height ? (height+"px") : (window.innerHeight+"px")) 
    : "auto"
// console.log(width, 'width')  
// console.log(height, 'heigth')

//   const windowHeight = (typeof window !== `undefined`) 
//     ? window.innerHeight
//     : "auto"
// console.log(windowHeight)
//     let width= this.props.fluid.presentationWidth 
//     let height= this.props.fluid.presentationHeight
// 
//     if (typeof window !== `undefined`) { 
//       console.log(width, window.innerWidth, height, window.innerHeight)
//       height = window.innerHeight > height ? height : window.innerHeight
//       width = window.innerWidth > width ? width : window.innerWidth
//       console.log(width, window.innerWidth, height, window.innerHeight)
//       // console.log(props.fluid)
//     }

    const location =
      (typeof window !== `undefined`) ? window.location.pathname : '/shop'

    const customStyles = (width, height) => {
      // this.content = {}
      // this.content.height = height
      // this.content.width = width
      return{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, // hack. for PayPal button visability under modal issue
          // width: '80%',
        },
        content : {
          color: 'black',
          // backgroundColor: 'black',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          border: '0px solid aqua',
          // objectFit: 'contain',
          // overflow: 'hidden',
          // maxWidth: '80%',
          // height: {height},
          width: "100%", // set this to image width
          height: "100%", // set this to image heigth
          margin: '0 auto',
          padding: '0px',
          // top: '0px',
          left: '0px',
          borderRadius: "0px",            
          textAlign: "center",

        }
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
    }

// console.log(customStyles())

    const NonStretchedImage = (props, width, height) => {
      let normalizedProps = props


      // let displayHeight = width < height ? "auto" : height
      // let displayWidth = height < width ? "auto" : width
      // console.log(displayWidth, displayHeight)
      // console.log(height, width)

      if (props.fluid && width) {
        normalizedProps = {
          ...props,
          style: {
            ...(props.style || {}),
            // border: "10px solid brown",
            width: "100%",
            height: "100%",            
            // maxWidth: "50%",
            // maxHeight: height,
            // margin: "0 auto !", // Used to center the image
            textAlign: "center",
          },
          imgStyle: {          
            // maxWidth: width,
            // maxHeight: height,
            height: height,
            width: width,            
            margin: "0 auto", // Used to center the image
            right: "0px",
            left: "0px",
            // height: displayHeight,
            // width: displayWidth,
          }
        }
      }

    return <Img {...normalizedProps} />
  }

    //console.log(this.props.source.presentationHeight)

  return (
    <Element>
      <div onClick={this.handleOpenModal}>{this.props.children}</div>

      <Modal
        isOpen={this.state.showModal}
        ariaHideApp={false}
        contentLabel="Inline Styles Modal Example"
        style={customStyles()}
      >
        <Link to={this.props.location} onClick={this.handleCloseModal}>
          <NonStretchedImage
            title={`Photo by Eghan Thompson`}
            fluid={this.props.source}
            id="modalImage"
            // imgStyle={{ ...imgStyle }}
          />
        </Link>
      </Modal>
    </Element>
    )
  }
}

export default PhotoModal
