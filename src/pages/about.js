import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import TagPreview from '../components/tag-preview'

const AboutDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1vw;
    padding: 30px;
    height: 90vh;
    @media (max-width: 750px) {
        grid-template-columns: 1fr;
        height: 150vh;
        padding: 2vw;
    }
`
const PreviewBox = styled.div`
  display: inline-block;
  border-radius: 15px;
  grid-column: span ${props => props.colSpan};
  grid-row: span ${props => props.rowSpan};
  border: 2px solid black;
  background-size: 105%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.img});
  @media (max-width: 750px) {
      grid-column: span 2;
      height: 50vw;
  }
`
const TextBox = styled.div`
  border: 1px solid black;
  display: inline-block;
  text-decoration: none;
  color: black;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin: 2%;
  float: ${props => props.boxAlign};
  text-align: bottom;
  grid-column: span 2;
  font-size: 0.85em;
  @media (max-width: 750px) {
    font-size: .6em;
    grid-column: span 3;
  }
`
const Text = styled.div`
  display: inline-block;
  width: 100%;
  text-indent: 1em;
  padding: .5em 1em;
  @media (max-width: 750px) {
    padding: .5em;
  }
`
const PreviewPhotoBox = styled.div`
  max-height: 1fr;
`
// const More = styled.div`
//   letter-spacing: 0.1em;
//   display: block;
//   align-self: flex-end;
//   padding: 0.2em 1em;
// `
const MobileSpacer = styled.div`
  height: 10px;
  @media (max-width: 750px) {
    height: 100px;
  }
`

const RenderRow = (PreviewObject, i) => {
    // styled components has an issue with named grid template areas, so...
    // reuse of style objects seems nice with this aproach
    let gridColumnSpan, gridRowSpan, boxAlignment = 'left';
    switch(i = 0) {
      case 0:
        gridColumnSpan = 3;
        gridRowSpan = 1;
        boxAlignment= 'right';
        break;
      case 1:
        gridColumnSpan = 2;
        gridRowSpan = 2;
        break;
      case 2:
        gridColumnSpan = 3;
        gridRowSpan = 1;
        boxAlignment= 'right';
        break;
      case 3:
        gridColumnSpan = 2;
        gridRowSpan = 1;
        boxAlignment= 'right';
        break;
      case 4:
        gridColumnSpan = 3;
        gridRowSpan = 1;
        break;
      case 5:
        gridColumnSpan = 3;
        gridRowSpan = 1;
        break;
}
    return(
      <PreviewBox key={PreviewObject.priority} colSpan={gridColumnSpan} rowSpan={gridRowSpan} img={PreviewObject.photo.localFiles[0].childImageSharp.high.src}>
        <PreviewPhotoBox />
        <TextBox boxAlign={boxAlignment}>
          <Text>{PreviewObject.details}</Text>
        </TextBox>
      </PreviewBox>
    )
}



const AboutPage = ({ data }) => {
    const PreviewDeck = data.allAirtable.edges
        .filter(i => i.node.data.name === 'about')
        .map(i => {
          return i.node.data // array of objects
        })
    return(
        <Layout>            
            <AboutDiv>
                {PreviewDeck.map((preview, i) => {
                    return RenderRow(preview, i)
                    })
                }
            </AboutDiv>
            <MobileSpacer/>
        </Layout>
    )
}

export default AboutPage

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
