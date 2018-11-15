import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Image from '../components/image'
import styled from 'styled-components'
import Img from 'gatsby-image'


const Index = styled(Link) `
    color: gray;
    display: block;
    border: 1px dashed silver;
    text-decoration: none;
    padding: .1rem 1.2rem;
    max-width: 160;
    float: center;
    &:hover {
      background-color: whitesmoke;
    }
`

const Box = styled.div `
  min-width: 350px;
  width: 95%;
  margin: auto;

`
const Photo = styled(Img)`
  float: right;
  max-width: 120px;
`


const IndexPage = ( { data } ) => (
  <Layout>
    <h1>SHop</h1>
    <Box>
      {data.allAirtable.edges
      .filter( edge => edge.node.data.discription !== null )
      .map((edge, i) => (
        <Index to={edge.node.data.name} key={edge.node.data.name}>{edge.node.data.discription}</Index>
      ))
    }
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
                childImageSharp {
                  fixed(width: 300) {
                    ...GatsbyImageSharpFixed
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

