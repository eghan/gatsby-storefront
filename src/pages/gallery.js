import React, { useState, useCallback, useEffect } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import EmblaCarouselReact from 'embla-carousel-react'

import Modal from '../components/modal'
import Gallery from '../components/gallery-display'
import { Button, Photo, PhotoBox } from '../utils/global'

const location =
  typeof window !== `undefined` ? window.location.pathname : '/gallery'

const Box = styled.div`
  /*min-width: 350px;*/
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
// const Photo = styled(Img)`
//   /*padding: 1em 1em;*/
//   border: 1px solid black;
//   width: 18vw;
//   height: 18vw;
//   @media (max-width: 750px) {
//     width: 47vw;
//     height: 47vw;
//   }
// `

const IndexPage = ({ data }) => {
  let photoFilter = data.allAirtable.edges.filter(
    edge => edge.node.data.name === 'photoset'
  )
  let photoFilter2 = data.allAirtable.edges.filter(
    edge => edge.node.data.name === 'photoset2'
  )
  let photos = photoFilter[0].node.data.photo.localFiles
  let photos2 = photoFilter2[0].node.data.photo.localFiles

  return (
    <>
      <Gallery images={photos} />
      {/* <Gallery images={photos2} /> */}
      <Box>
        {photoFilter.map((edge, i) =>
          edge.node.data.photo.localFiles.map(img => (
            <PhotoBox>
              <Modal
                object={img}
                source={img.childImageSharp.high}
                location={location}
                name={img.name}
                text="Inquire here"
              >
                <Photo
                  fadeIn={true}
                  key={img.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={img.childImageSharp.low}
                />
              </Modal>
            </PhotoBox>
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
