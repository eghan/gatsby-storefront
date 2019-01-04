import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0rem auto;
  padding: 1em 1em;  
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    padding: 0em 0em;
  }
  /*max-width: 1fr;*/
  /*border: 1px dashed silver;*/
  /*align-items: center;*/
`
const Photos = styled.div`
  /*margin: 0rem auto;  */
  grid-column: 1;
  border: 3px dashed silver;
`
const Info = styled.div`
  width: 50vw;
  padding: 1em 1em;
  border: 1px dashed silver; 
  @media (max-width: 750px) {
    width: 100vw;
  }
`
const Photo = styled(Img)`
  float: right;
  width: 50vw; 
  @media (max-width: 750px) {
    width: 100vw;
  }
  /*padding: 0.5rem 0.7rem;*/
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
          Feel free to to inquire about
          comissioning a piece like this one, with this handy form.
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
//because the name field is carried over direct file query is much cleaner

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
