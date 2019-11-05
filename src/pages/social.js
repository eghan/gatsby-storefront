import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Inquiry } from '../utils/global'

const SocialDiv = styled.div`
  place-items: center;
  margin: 2em 10vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  width: 80vw;
  @media (max-width: 750px) {
  margin: 1em 10vw;
  /*grid-gap: 0;*/

  }
`
const SocialItem = styled.div`
  display: grid;
  @media (max-width: 750px) {
    grid-column: span 2;
    padding: .6em;
  }
`
const Photo = styled(Img)`
  width: 10vw;
  height: 10vw;
  @media (max-width: 750px) {
  width: 30vw;
  height: 30vw;
  }
  // method to access picture properties directly
  picture {
/*    overflow: hidden;
    width: 100px;
*/  }

  @media (max-width: 1040px) {
/*    padding: 0em 0em;
    width: 150px;
    height: 150px;*/
  }
`
const Content = styled.div`
  text-align: center;
  padding: 0 1em;
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
              priority
              photo {
                localFiles {
                  name
                  id
                  childImageSharp {
                    low: fluid(
                      quality: 60
                      maxWidth: 400
                      maxHeight: 400
                      cropFocus: CENTER
                    ) {
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

  const Socials = data.allAirtable.edges
    .filter(edge => edge.node.data.name === 'social')
    .map(element => element.node.data)
    .sort((a, b) => a.priority - b.priority)

  return (
    <>
      <SocialDiv>
        {Socials.map(element => {
          return (
            // <div>
            <SocialItem key={element.section}>
              <a
                href={element.details}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Photo
                  key={element.section}
                  title={element.section}
                  fluid={element.photo.localFiles[0].childImageSharp.high}
                />
              </a>
            </SocialItem>
            // {/* <Section>{element.node.data.section}</Section> */}
          )
        })}
      </SocialDiv>
      <Content>
        Or you can get in touch with me directly over here: <Inquiry />
      </Content>
    </>
  )
}

export default About
