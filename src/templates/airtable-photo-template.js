import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0rem auto;
  padding: .5em .5em;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    padding: 0em 0em;
  }
`
const Photos = styled.div`
  grid-column: 1fr;
`
const Info = styled.div`
  font-size: 0.8em;
  padding: 1em 1em 1em 1em;
`
const Photo = styled(Img)`
  height: 90vh;
`

export default ({ data }) => {
  const { node } = data.allFile.edges[0]

  return (
    <Layout>
      <Container>
        <Photos>
          <Photo
            title={`Photo by Eghan Thompson`}
            fluid={node.childImageSharp.fluid}
          />
        </Photos>
        <Info>
          This piece has sold into a private collection.
          <br />
          <br />
          If you'd like something like this, please, drop me a line.
          <br />
          <br />
          <p>{node.name}</p>
        </Info>
      </Container>
    </Layout>
  )
}

//this query is constructed from the allFile field rather than the allAirtable field
//because the node link in createRemoteFileNode does not carry with it query definitions
//which is further complicated by the array nesting of the field to filter
//because the name field is carried over, direct file query is much cleaner

export const query = graphql`
  query linkedFile($name: String!) {
    allFile(filter: { name: { eq: $name } }) {
      edges {
        node {
          id
          name
          childImageSharp {
            fluid(quality: 100, maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
