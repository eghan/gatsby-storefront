import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Box = styled.div`
  /*min-width: 350px;*/
  text-align: center;
`
const Photo = styled(Img)`
  /*padding: 1em 1em;*/
  border: 10px solid white;

`

const IndexPage = ({ data }) => (
  <Layout>
    <Box>
      {data.allAirtable.edges
        .filter(edge => edge.node.data.discription == null)
        .map((edge, i) =>
          edge.node.data.photo.localFiles.map(img => (
            <Link to={img.name} key={img.name}>
              <Photo
                key={img.id}
                title={`Photo by Eghan Thompson`}
                fixed={img.childImageSharp.fixed}
              />
            </Link>
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
            discription
            photo {
              id
              localFiles {
                id
                name
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
