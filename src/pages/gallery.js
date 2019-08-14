import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Modal from '../components/modal'

const location =
  typeof window !== `undefined` ? window.location.pathname : '/gallery'

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
`

const IndexPage = ({ data }) => (
    <Box>
      {data.allAirtable.edges
        .filter(edge => edge.node.data.name === 'photoset')
        .map((edge, i) =>
          edge.node.data.photo.localFiles.map(img => (
              <Modal
                source={img.childImageSharp.low}
                location={location}
                name={img.name}
                text='Inqure here'
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
