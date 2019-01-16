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
  border-radius: .5em;
  border: 2px solid black;
  height: 10em;
/*
  display: grid;
  &:nth-child(2n+4) {
    grid-row: span 2;
    grid-column: span 2;
  }
  @media (max-width: 1150px) {
  &:nth-child(3n+7) {
    grid-row-start: span 2;
    grid-column-start: span 2;
  }
  }*/
`
const Photo = styled(Img)`
  /*padding: 1em 1em;*/
  //border: 10px solid white;
`
const PreviewBox = styled.div`
  border-radius: .5em;
  grid-column: span 3;
  border: 1px solid black;
  height: 10em;
  align-items: center;
`

const IndexPage = ({ data }) => (
  <Layout>
    <Box>

        {/*     {data.allAirtable.edges */}
        {/* .map((edge, i) => */}

      <PhotoBox>1</PhotoBox>
      <PreviewBox>2</PreviewBox>
      <PhotoBox>3</PhotoBox>
      
      <PreviewBox>2</PreviewBox>
      <PhotoBox>1</PhotoBox>
      <PhotoBox>3</PhotoBox>

      <PhotoBox>1</PhotoBox>
      <PhotoBox>3</PhotoBox>
      <PreviewBox>2</PreviewBox>

      <PhotoBox>1</PhotoBox>
      <PreviewBox>2</PreviewBox>
      <PhotoBox>3</PhotoBox>
      
      <PreviewBox>2</PreviewBox>
      <PhotoBox>1</PhotoBox>
      <PhotoBox>3</PhotoBox>

      <PhotoBox>1</PhotoBox>
      <PhotoBox>3</PhotoBox>
      <PreviewBox>2</PreviewBox>
      {data.allAirtable.edges
        .filter(edge => edge.node.data.name == 'preview')
        .map((edge, i) =>
          edge.node.data.photo.localFiles.map( img => (
            <PhotoBox>
              <TextModal
                source={img.childImageSharp.low}
                location={location}
                name={img.name}
              >
                <Photo
                  key={img.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={img.childImageSharp.high}
                />
              </TextModal>
            </PhotoBox>
          ))
        )}

      {data.allAirtable.edges
        .filter(edge => edge.node.data.name == 'photoset')
        .map((edge, i) =>
          edge.node.data.photo.localFiles.map( img => (
            <PhotoBox>
              <TextModal
                source={img.childImageSharp.low}
                location={location}
                name={img.name}
              >
                <Photo
                  key={img.id}
                  title={`Photo by Eghan Thompson`}
                  fluid={img.childImageSharp.high}
                />
              </TextModal>
            </PhotoBox>
          ))
        )}
    </Box>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          data {
            name
            discription
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
