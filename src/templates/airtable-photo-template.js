import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0rem auto;
  max-width: 90%;
  border: 1px dashed silver;
  align-items: center;
`
const Photos = styled.div`
  margin: 0rem auto;
  max-width: 400px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  float: center;
  border: 1px dashed silver;
`
const Info = styled.div`
  padding: 0.05rem 0.5rem;
  margin: 1rem auto;
  display: inline-block;
  flex-direction: column;
  border: 1px dashed silver;
`
const Photo = styled(Img)`
  padding: 2px 2px;
  float: center;
  display: inline-block;
`

export default ({ data }) => {
  const { node } = data.allFile.edges[0]

  return (
    <Layout>
      <Container>
        <Photos>
          <div className={node.id}>
            <Photo
              title={`Photo by Eghan Thompson`}
              fixed={node.childImageSharp.fixed}
            />
          </div>
        </Photos>
        <Info>
          This unique creation has been sold into the world. To inquire about
          comissioning a piece like this one, click the link below.
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
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
