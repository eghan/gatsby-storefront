import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Footer from '../components/footer'

const AboutDiv = styled.div`
    padding: 30px;
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
  @media (max-width: 750px) {
      grid-column: span 2;
      height: 100px;
    }
`
const TextBox = styled(Link)`
  border: 1px solid black;
  display: flex;
  text-decoration: none;
  color: black;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  height: 50%;
  margin: 5%;
  grid-column: span 2;
  font-size: 0.75em;
    @media (max-width: 750px) {
      font-size: .6em;
      overflow: hidden;
      grid-column: span 3;
      max-height: 200px;
      height: auto;   
      width: 100%;
      margin: 0;
}
`
const Text = styled.div`
  width: 100%;
  padding: 1em;
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
        <TextBox to={PreviewObject.section}>
          <Text>{PreviewObject.details}</Text>
          <More>More...</More>
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
        <div>test</div>
        {PreviewDeck.map((preview, i) => {
            return RenderRow(preview, i)
            })
        }
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
