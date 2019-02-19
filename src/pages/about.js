import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Footer from '../components/footer'

const AboutDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1vw;
    padding: 30px;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    /*height: 400px;*/
    padding: 2vw;
    }
`
const PreviewBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 15px;
  grid-column: span 3;
  border: 2px solid black;
  background-size: 900px;
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
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin: 5%;
  grid-column: span 2;
  font-size: 0.75em;
    @media (max-width: 750px) {
      font-size: .6em;
      grid-column: span 3;
}
`
const Text = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  @media (max-width: 750px) {
    padding: .5em;
  }
`
const PreviewPhotoBox = styled.div`
  max-height: 1fr;
`
const More = styled.div`
  letter-spacing: 0.1em;
  display: block;
  align-self: flex-end;
  padding: 0.2em 1em;
`

const RenderRow = (PreviewObject, i) => {
  return(
      <PreviewBox img={PreviewObject.photo.localFiles[0].childImageSharp.high.src}>
        <PreviewPhotoBox />
        <TextBox>
          <Text>&nbsp;&nbsp;&nbsp;&nbsp;{PreviewObject.details}</Text>
          {/* <More>More...</More> */}
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
