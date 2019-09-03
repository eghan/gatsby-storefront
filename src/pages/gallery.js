import React, { useState, useCallback, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import EmblaCarouselReact from 'embla-carousel-react'
import Modal from '../components/modal'

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
  width: 300px;
  height: 300px;
`




const Carousel = styled.div`
  grid-gap: 1vw;
  padding: 1vw;
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  margin: auto;
`
const CarouselNavigation = styled.button`
  width: 10vw;
`
const CarouselCenter = styled.div`
  grid-area: 1/2;
`
const CarouselPhoto = styled(Photo)`
  height: 500px;
  width: 500px;
`

const EmblaCarouselComponent = photos => {
  const [embla, setEmbla] = useState(null)
  const scrollPrev = useCallback(() => embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla.scrollNext(), [embla])

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`)
      })
    }
  }, [embla])

  return (
    <Carousel>
      {/* {JSON.stringify(photos.photos[0].node.data.photo.localFiles[0])} */}
      <CarouselNavigation onClick={scrollPrev}>Previous</CarouselNavigation>
      <EmblaCarouselReact
        htmlTagName="div"
        emblaRef={setEmbla}
        options={{ loop: true, startIndex: 2 }}
      >
        <CarouselCenter style={{ display: 'flex' }}>
          {photos.photos[0].node.data.photo.localFiles.map(img => (
            <Modal
              object={img}
              doubleclick="true"
              source={img.childImageSharp.low}
              location={location}
              name={img.name}
              text="Inqure here"
            >
              <CarouselPhoto
                fadeIn={true}
                key={img.id}
                title={`Photo by Eghan Thompson`}
                fluid={img.childImageSharp.low}
                style={{ flex: '0 0 100%' }}
              />
            </Modal>
          ))}
        </CarouselCenter>
      </EmblaCarouselReact>

      <CarouselNavigation onClick={scrollNext}>Next</CarouselNavigation>
    </Carousel>
  )
}

const IndexPage = ({ data }) => (
  <>
    <EmblaCarouselComponent
      photos={data.allAirtable.edges.filter(
        edge => edge.node.data.name === 'photoset'
      )}
    />
    <Box>
      {data.allAirtable.edges
        .filter(edge => edge.node.data.name === 'photoset')
        .map((edge, i) =>
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
