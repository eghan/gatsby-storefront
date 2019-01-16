import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'

import TextModal from '../components/textmodal'
const location =
  typeof window !== `undefined` ? window.location.pathname : '/shop'

const Box = styled.div`
  /*min-width: 350px;*/
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  padding: 1vw 3vw;
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
const PhotoBox = styled.div`
  border-radius: 0.5em;
  border: 2px solid black;
  height: 1fr;
  overflow: hidden;
`
const Photo = styled(Img)`
  height: 1fr;
`
const PreviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 0.5em;
  grid-column: span 3;
  border: 1px solid black;
  height: 1fr;
  align-items: center;
  overflow: hidden;
`
const TextBox = styled.div`
  border: 1px solid gold;
  grid-column: span 2;
`

const IndexPage = ({ data }) => {
  const PreviewDeck = data.allAirtable.edges
    .filter(i => i.node.data.section !== null)
    .map(i => {
      return i.node.data // array of objects
    })

  const ImageDeck = data.allAirtable.edges
    .filter(d => d.node.data.name === 'photoset')
    .map(i => {
      return i.node.data.photo.localFiles // array of objects
    })[0]

  // console.log(ImageDeck[0])
  //console.log(ImageDeck[0])
  return (
    <Layout>
      {PreviewDeck.map((preview, i) => {
        let photoOne = ImageDeck.splice(
          Math.floor(Math.random() * ImageDeck.length),
          1
        )[0]
        let photoTwo = ImageDeck.pop()
        let priority = PreviewDeck.filter(card => card.priority - 1 === i)[0]
        // console.log(ImageDeck[0])
        // console.log(priority)
        // console.log(preview)
        return (
          <Box key={i}>
            <PhotoBox>
              <TextModal
                source={photoOne.childImageSharp.low}
                location={location}
                name={photoOne.name}
              >
                <Photo
                  key={photoOne.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={photoOne.childImageSharp.high}
                />
              </TextModal>
            </PhotoBox>
            <PreviewBox>
              <Photo
                key={priority.id}
                title={`Photo by Eghan Thompson`}
                fluid={priority.photo.localFiles[0].childImageSharp.high}
              />
              <TextBox>{priority.details}</TextBox>
            </PreviewBox>
            <PhotoBox>
              <TextModal
                source={photoTwo.childImageSharp.low}
                location={location}
                name={photoTwo.name}
              >
                <Photo
                  key={photoTwo.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={photoTwo.childImageSharp.high}
                />
              </TextModal>
            </PhotoBox>
          </Box>
        )
      })}

      {/*         {data.allAirtable.edges */}
      {/*           .filter(edge => edge.node.data.name === 'preview') */}
      {/*           .map((edge, i) => */}
      {/*             edge.node.data.photo.localFiles.map(img => ( */}
      {/*               <PhotoBox> */}
      {/*                 <TextModal */}
      {/*                   source={img.childImageSharp.low} */}
      {/*                   location={location} */}
      {/*                   name={img.name} */}
      {/*                 > */}
      {/*                   <Photo */}
      {/*                     key={img.id} */}
      {/*                     title={`Photo by Eghan Thompson`} */}
      {/*                     fluid={img.childImageSharp.high} */}
      {/*                   /> */}
      {/*                 </TextModal> */}
      {/*               </PhotoBox> */}
      {/*             )) */}
      {/*           )} */}
      {/*  */}
      {/*         {data.allAirtable.edges */}
      {/*           .filter(edge => edge.node.data.name === 'photoset') */}
      {/*           .map((edge, i) => */}
      {/*             edge.node.data.photo.localFiles.map(img => ( */}
      {/*               <PhotoBox> */}
      {/*                 <TextModal */}
      {/*                   source={img.childImageSharp.low} */}
      {/*                   location={location} */}
      {/*                   name={img.name} */}
      {/*                 > */}
      {/*                   <Photo */}
      {/*                     key={img.id} */}
      {/*                     title={`Photo by Eghan Thompson`} */}
      {/*                     fluid={img.childImageSharp.high} */}
      {/*                   /> */}
      {/*                 </TextModal> */}
      {/*               </PhotoBox> */}
      {/*             )) */}
      {/*           )} */}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          data {
            id
            name
            section
            priority
            discription
            details
            photo {
              id
              localFiles {
                id
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
