import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'

const SocialDiv = styled.div`
  margin: 1vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  width: 100%;
`

const SocialData = styled.div`
  display: grid;
  @media (max-width: 750px) {
      grid-column: span 2;
      height: 50vw;
  }
`
const Photo = styled(Img)`
  width: 300px;
  height: 300px;

// method to access picture properties directly
    picture {
     overflow: hidden;
     width: 100px;
    }

  @media (max-width: 1040px) {
    padding: 0em 0em;
    width: 150px;
    height: 150px;
  }
`

const About = () => {
  const data = useStaticQuery(graphql`
  query SocialQuery {
    allAirtable {
      edges {
        node {
          data {
            name
            section
            details
            photo {
              localFiles {
                name
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
`)

  const Socials = data.allAirtable.edges.filter( edge => edge.node.data.name === "social" )
  return(
  <Layout>
    <SocialDiv>
    {Socials.map( element => {
      return (
        <div>
          <SocialData key={element.section}>
          <a href={element.node.data.details} target="_blank" rel="noopener noreferrer">   
            <Photo
                  key={element.node.data.section}
                  title={element.node.data.section}
                  fluid={element.node.data.photo.localFiles[0].childImageSharp.high}
          />
        </a>
          </SocialData>{element.node.data.section}                

        </div>
        )
      })}
  </SocialDiv>
  </Layout>
  )
}

export default About
