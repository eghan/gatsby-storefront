import React, { useState, useCallback, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import EmblaCarouselReact from 'embla-carousel-react'

import Modal from '../components/modal'
import Gallery from '../components/gallery-display'
import { Button } from '../utils/global'

const location =
  typeof window !== `undefined` ? window.location.pathname : '/gallery'

// import React, { useState, useCallback, useEffect } from 'react'

const Box = styled.div`
  /*min-width: 350px;*/
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  padding: 1vw;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  text-align: center;
`
const Photo = styled(Img)`
  /*padding: 1em 1em;*/
  border: 1px solid black;
  width: 18vw;
  height: 18vw;
  @media (max-width: 750px) {
    width: 47vw;
    height: 47vw;
  }
`

const Carousel = styled.div`
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  /*border: 1px solid gray;*/
  /*padding: 1vw;*/
  width: 90vw;
  /*  display: grid;
  grid-template-columns: 1fr 7fr 1fr;*/
  margin: auto;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`
const CarouselNavigation = styled(Button)`
  font-size: 3em;
  color: grey;
  width: 10vw;
  outline: none;
  @media (max-width: 750px) {
    display: none;
  }
`
const CarouselCenter = styled.div`
  /*  grid-area: 1/2;
  width: 100vw;*/
  margin: 0.5em;
`
const CarouselPhoto = styled(Photo)`
  height: 33vw;
  width: 33vw;
  margin: 1em 1em 0.5em 1em;
  @media (max-width: 750px) {
    margin: 0.1em;
    height: 70vw;
    width: 70vw;
  }
`
const PhotoGrid = styled.div`
  display: grid;
`
const PhotoModal = styled(Modal)`
  grid-area: 1 1 1 1;
`
const PhotoButton = styled(Button)`
  grid-area: 2 1 2 1;
  width: 40%;
  color: gray;
  margin: auto;
  font-size: 0.7em;
`

// const EmblaCarouselComponent = photos => {
//   const [embla, setEmbla] = useState(null)
//   const scrollPrev = useCallback(() => embla.scrollPrev(), [embla])
//   const scrollNext = useCallback(() => embla.scrollNext(), [embla])
//
//   if (typeof window !== `undefined`) {
//     let clickWait = false
//     setInterval(() => {
//       if (embla !== null && !clickWait) {
//         embla.scrollNext()
//       }
//     }, 3000)
//     document.addEventListener('click', () => {
//       clickWait = true
//       setTimeout(() => {
//         clickWait = false
//       }, 6000)
//     })
//   }
//
//   useEffect(() => {
//     if (embla) {
//       embla.on('select', () => {
//         console.log(`Current index is ${embla.selectedScrollSnap()}`)
//       })
//     }
//   }, [embla])
//
//   // console.log(photos.photos[0].node.data.photo.localFiles)
//
//   return (
//     <>
//     {/* <Gallery images={photos.photos[0].node.data.photo.localFiles} /> */}
//     <Carousel>
//       {/* {JSON.stringify(photos.photos[0].node.data.photo.localFiles[0])} */}
//       {/* <CarouselNavigation onClick={scrollPrev}> */}
//       {/*   {'\u219C'} */}
//       {/*   <br /> */}
//       {/*   {'\u219C'} */}
//       {/*   <br /> */}
//       {/*   {'\u219C'} */}
//       {/* </CarouselNavigation> */}
//       <EmblaCarouselReact
//         htmlTagName="div"
//         emblaRef={setEmbla}
//         options={{ loop: true, startIndex: 1, speed: 8 }}
//       >
//         <CarouselCenter style={{ display: 'flex' }}>
//           {photos.photos[0].node.data.photo.localFiles.map(img => (
//             <PhotoGrid>
//               <PhotoModal
//                 object={img}
//                 doubleclick="true"
//                 source={img.childImageSharp.low}
//                 location={location}
//                 name={img.name}
//                 text="Inqure here"
//               >
//                 <CarouselPhoto
//                   fadeIn={true}
//                   key={img.id}
//                   title={`Photo by Eghan Thompson`}
//                   fluid={img.childImageSharp.low}
//                   style={{ flex: '0 0 100%' }}
//                 />
//               </PhotoModal>
//               <PhotoButton>inquiries</PhotoButton>
//             </PhotoGrid>
//           ))}
//         </CarouselCenter>
//       </EmblaCarouselReact>
//       {/*  */}
//       {/*       <CarouselNavigation onClick={scrollNext}> */}
//       {/*         {'\u219D'} */}
//       {/*         <br /> */}
//       {/*         {'\u219D'} */}
//       {/*         <br /> */}
//       {/*         {'\u219D'} */}
//       {/*       </CarouselNavigation> */}
//     </Carousel>
//     </>
//   )
// }

const IndexPage = ({ data }) => {
  let photoFilter = data.allAirtable.edges.filter(
    edge => edge.node.data.name === 'photoset'
  )
  let photos = photoFilter[0].node.data.photo.localFiles
  return (
    <>
      <Gallery images={photos} />
      <Box>
        {photoFilter.map((edge, i) =>
          edge.node.data.photo.localFiles.map(img => (
            <Modal
              object={img}
              source={img.childImageSharp.low}
              location={location}
              name={img.name}
              text="Inqure here"
            >
              <Photo
                fadeIn={true}
                key={img.id}
                title={`Photo by Eghan Thompson`}
                fluid={img.childImageSharp.low}
              />
            </Modal>
          ))
        )}
      </Box>
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          data {
            name
            id
            discription
            photo {
              id
              localFiles {
                id
                name
                childImageSharp {
                  low: fluid(quality: 50) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                  high: fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
