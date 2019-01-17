import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'

import TextModalComponent from '../components/textmodal'
const location =
  typeof window !== `undefined` ? window.location.pathname : '/shop'

const Box = styled.div`
  /*min-width: 350px;*/
  margin: 1vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  height: 1fr;
`
const PhotoBox = styled.div`

  zoom: .5; //increase if you have very small images
  border-radius: 0.5em;
  border: 2px solid black;
  overflow: hidden;
  object-fit: cover;
  background-position: center; 
  background-image: url(${props => props.img});
`
const Photo = styled(Img)`
  zoom: 2; //increase if you have very small images

  display: block;
  margin: auto;

  height: 1fr;
  max-height: 100%;

  width: 1fr;
  max-width: 100%;
`
const PreviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 0.5em;
  grid-column: span 3;
  border: 1px solid black;
  overflow: hidden;
`
const TextBox = styled.div`
  padding: 1em;
  grid-column: span 2;
`
const TextModal = styled(TextModalComponent)`
  border: 2px solid purple;
`
const PreviewPhotoBox = styled.div`
  max-height: 1fr;
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
        //console.log(photoOne.childImageSharp.low.src)

        return (
          <Box key={i}>
            <PhotoBox img={photoOne.childImageSharp.low.src}>
              <TextModal
                source={photoOne.childImageSharp.low}
                location={location}
                name={photoOne.name}
              >
                {/* <Photo */}
                {/*   key={photoOne.id} */}
                {/*   title={`Photo by Eghan Thompson`} */}
                {/*   fluid={photoOne.childImageSharp.high} */}
                {/* /> */}
              </TextModal>
            </PhotoBox>
            <PreviewBox>
              <PreviewPhotoBox>
                <Photo
                  key={priority.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={priority.photo.localFiles[0].childImageSharp.low}
                />
              </PreviewPhotoBox>
              <TextBox>{priority.details}</TextBox>
            </PreviewBox>
            <PhotoBox img={photoTwo.childImageSharp.low.src}>
              <TextModal
                source={photoTwo.childImageSharp.low}
                location={location}
                name={photoTwo.name}
              >1
                {/* <Photo */}
                {/*   key={photoTwo.id} */}
                {/*   title={`Photo by Eghan Thompson`} */}
                {/*   fluid={photoTwo.childImageSharp.high} */}
                {/* /> */}
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
