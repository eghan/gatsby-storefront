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
  grid-template-areas: "preview One Two Three";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
  grid-area: ${props => props.area};
  border-radius: 15px;
  border: 1px solid black;
  width: 1fr;
  height: 1fr;
  overflow: auto;
`
const Photo = styled(Img)`
  border-radius: 15px;
  height: 1fr;
`
const PreviewBox = styled.div`
  display: grid;
  grid-area: 'preview';
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 15px;
  grid-column: span 3;
  border: 1px solid black;
  background-size: 900px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.img});
`
const TextBox = styled.div`
  border: 1px solid black;
  display: flex;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  height: 60%;
  margin: 5%;
  grid-column: span 2;
  font-size: 0.75em;
`
const More = styled.div`
  letter-spacing: 0.1em;
  display: block;
  align-self: flex-end;
  padding: 0.2em 1em;
`
const Text = styled.div`
  width: 100%;
  padding: 20px;
`
const TextModal = styled(TextModalComponent)`
  border: 2px solid purple;
`
const PreviewPhotoBox = styled.div`
  max-height: 1fr;
`
const RenderPhoto = ( PhotoObject ) => {
  return (
            <PhotoBox img={PhotoObject.childImageSharp.low.src}>
              <TextModal
                key={PhotoObject.name}
                source={PhotoObject.childImageSharp.high}
                // location={location}
                name={PhotoObject.name}
              >
                <Photo
                  key={PhotoObject.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={PhotoObject.childImageSharp.low}
                />
              </TextModal>
            </PhotoBox>
            )
}

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
        let photoThree = ImageDeck.shift()
        let subject = PreviewDeck.filter(card => card.priority - 1 === i)[0]
        // console.log(ImageDeck[0])
        // console.log(priority)
        //console.log(photoOne.childImageSharp.low.src)

        return (
          <Box key={i}>
            {RenderPhoto(photoOne)}
            <PreviewBox
              img={subject.photo.localFiles[0].childImageSharp.high.src}
            >
              <PreviewPhotoBox />
              <TextBox>
                <Text>{subject.details}</Text>
                <More>More...</More>
              </TextBox>
            </PreviewBox>
            {RenderPhoto(photoTwo)}
            {RenderPhoto(photoThree)}
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
                  low: fluid(quality: 60, maxWidth: 400, maxHeight: 400, cropFocus: CENTER) {
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
