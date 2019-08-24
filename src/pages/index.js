import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'

import { Button } from '../utils/global'
import PhotoModal from '../components/modal'
const location =
  typeof window !== `undefined` ? window.location.pathname : '/shop'

// function shuffle (arr) {  // Fisher-Yates shuffle
//   var i = 0
//     , j = 0
//     , temp = null
//
//   for (i = arr.length - 1; i > 0; i -= 1) {
//     j = Math.floor(Math.random() * (i + 1))
//     temp = arr[i]
//     arr[i] = arr[j]
//     arr[j] = temp
//   }
//   return arr
// }

const Box = styled.div`
  /*min-width: 350px;*/
  /*text-align: center;*/
  margin: 1vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 750px) {
    display: none;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  height: 15vw;
`

const MobileBox = styled.div`
  margin: 1vw;
  padding: 1vw 5vw 1vw 1vw;
  display: grid;
  grid-gap: 2vw;
  height: 45vw;
  width: 94vw;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    display: none;
  }
`

const PhotoBox = styled.div`
  border-radius: 15px;
  border: 1px solid black;
  width: 15vw;
  height: 15vw;
  overflow: hidden;
  @media (max-width: 750px) {
    height: 45vw;
    width: 45vw;
  }
`
const Photo = styled(Img)`
  border-radius: 15px;
  height: 15vw;
  @media (max-width: 750px) {
    height: 45vw;
    /*width: 45vw;*/
  }
`
// const PreviewBox = styled.div`
//   display: grid;
//   grid-area: 'preview';
//   grid-template-columns: 1fr 1fr 1fr;
//   border-radius: 15px;
//   grid-column: span 3;
//   border: 1px solid black;
//   background-size: 105%;
//   background-position: center;
//   background-repeat: no-repeat;
//   background-image: url(${props => props.img});
//   @media (max-width: 750px) {
//       grid-column: span 2;
//       height: 100px;
// }
// `
const PreviewBox = styled.div`
  position: relative;
  grid-column: span 3;
  border-radius: 15px;
  border: 1px solid black;
  /*width: 15vw;*/
  height: 15vw;
  overflow: hidden;
  object-fit: cover;
  /*object-position: 20% 80%; // HERE*/
  @media (max-width: 750px) {
    height: 45vw;
    width: 92vw;
  }
`

const TextBox = styled(Link)`
  z-index: 100;
  position: absolute;
  left: 6vw;
  top: 0.3vw;
  border: 1px solid black;
  display: flex;
  text-decoration: none;
  color: black;
  background-color: rgba(255, 255, 255, 0.90);
  border-radius: 15px;
  height: 50%;
  margin: 5%;
  grid-column: span 2;
  font-size: 0.75em;
  @media (max-width: 750px) {
    font-size: 0.6em;
    overflow: hidden;
    grid-column: span 3;
    max-height: 200px;
    height: auto;
    width: 100%;
    left: 0;
    margin: 0;
    padding: 0;
  }
`
const More = styled.div`
  letter-spacing: 0.1em;
  grid-column: span 3;
  align-self: flex-end;
  text-align: right;
  
`

const Text = styled.div`
  width: 100%;
  padding: 1em;
    @media (max-width: 750px) {
      padding: 0;
      margin: .5em 0 0 .5em;
      /*padding: .3em .8em 0 .3em;*/
    }
`
const StyledModal = styled(PhotoModal)`
  border: 2px solid purple;
`

const RenderPhoto = PhotoObject => {
  return (
    <PhotoBox>
      <StyledModal
        object={PhotoObject}
        key={PhotoObject.id}
        source={PhotoObject.childImageSharp.high}
        name={PhotoObject.name}
        text="Inquire here"
      >
        <Photo
          key={PhotoObject.id}
          title={`Photo by Eghan Thompson`}
          fluid={PhotoObject.childImageSharp.low}
        />
      </StyledModal>
    </PhotoBox>
  )
}

const RenderPreview = PreviewObject => {
  return (
    <PreviewBox>
      <Photo
        key={PreviewObject.photo.localFiles[0].id}
        title={`Photo by Eghan Thompson`}
        fluid={PreviewObject.photo.localFiles[0].childImageSharp.low}
      />
      <TextBox to={PreviewObject.section}>
        <Text>
          {PreviewObject.details}
          <More>
            more...
            <Button
              onClick={() => {
                navigate(PreviewObject.section)
              }}
            >
              {PreviewObject.section}
            </Button>
          </More>
        </Text>
      </TextBox>
    </PreviewBox>
  )
}

//
// const RenderPreview = (PreviewObject) => {
//   return(
//       <PreviewBox img={PreviewObject.photo.localFiles[0].childImageSharp.high.src}>
//         <PreviewPhotoBox />
//         <TextBox to={PreviewObject.section}>
//           <Text>{PreviewObject.details}</Text>
//           <More>More...</More>
//         </TextBox>
//       </PreviewBox>
//     )
// }

const RenderRow = (photoOne, photoTwo, photoThree, subject, i) => {
  // DRY this out ?

  if (i % 4 === 0) {
    return (
      <>
        <Box key={i}>
          {RenderPhoto(photoOne)}
          {RenderPreview(subject)}
          {RenderPhoto(photoTwo)}
          {RenderPhoto(photoThree)}
        </Box>
        <MobileBox>{RenderPreview(subject)}</MobileBox>
        <MobileBox>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
        </MobileBox>
      </>
    )
  }
  if (i % 4 === 1) {
    return (
      <>
        <Box key={i}>
          {RenderPreview(subject)}
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
          {RenderPhoto(photoThree)}
        </Box>
        <MobileBox>{RenderPreview(subject)}</MobileBox>
        <MobileBox>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
        </MobileBox>
      </>
    )
  }
  if (i % 4 === 2) {
    return (
      <>
        <Box key={i}>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
          {RenderPreview(subject)}
          {RenderPhoto(photoThree)}
        </Box>
        <MobileBox>{RenderPreview(subject)}</MobileBox>
        <MobileBox>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
        </MobileBox>
      </>
    )
  }
  if (i % 4 === 3) {
    return (
      <>
        <Box key={i}>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
          {RenderPhoto(photoThree)}
          {RenderPreview(subject)}
        </Box>
        <MobileBox>{RenderPreview(subject)}</MobileBox>
        <MobileBox>
          {RenderPhoto(photoOne)}
          {RenderPhoto(photoTwo)}
        </MobileBox>
      </>
    )
  }
}

const IndexPage = ({ data }) => {
  const PreviewDeck = data.allAirtable.edges
    .filter(i => i.node.data.name === 'preview')
    .map(i => {
      return i.node.data // array of objects
    })

  const ImageDeck = data.allAirtable.edges
    .filter(d => d.node.data.name === 'photoset')
    // add filter here to catch case of childImageSharp being null
    .map(i => {
      return i.node.data.photo.localFiles // array of objects
    })[0]
    .map(x => {
      //console.log(x.childImageSharp)
      return x
    })

  const ShuffleDeck = ImageDeck
  // const ShuffleDeck = shuffle(ImageDeck);
  // console.log('TEST', ShuffleDeck)

  return (
    <>
      {PreviewDeck.map((preview, i) => {
        if (ShuffleDeck.length >= 3 * i + 2) {
          let photoOne = ShuffleDeck[3 * i]
          let photoTwo = ShuffleDeck[3 * i + 1]
          let photoThree = ShuffleDeck[3 * i + 2]
          let subject = PreviewDeck.filter(card => card.priority - 1 === i)[0]
          return RenderRow(photoOne, photoTwo, photoThree, subject, i)
        }
        return <div />
      })}
      <Box key="images">{ImageDeck.map(img => RenderPhoto(img))}</Box>
      <MobileBox key="images">
        {ImageDeck.map(img => RenderPhoto(img))}
      </MobileBox>

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
                  low: fluid(
                    quality: 50
                    maxWidth: 400
                    maxHeight: 400
                    cropFocus: CENTER
                  ) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                  high: fluid(quality: 80) {
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
