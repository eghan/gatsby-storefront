import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
  text-align: center;
  width: 100%;
  margin: 0.5rem auto;
  border: 1px dashed red;
`
const Photo = styled(Img)`
  padding: 1em 1em;
  max-width: 200px;
  max-height: 200px;
  display: inline-block;
`
const PhotoLink = styled(Link)`
  padding: 1em 1em;
  display: inline-block;
`

function renderTagMatches(data) {
  let matchList = []

  if (data.airtable !== null) {
    data.airtable.edges.map(item => {
      matchList = [
        ...matchList,
        [item.node.data.name, item.node.data.image.localFiles[0]],
      ]
    })
  }

  if (data.etsy !== null) {
    data.etsy.edges.map(item => {
      matchList = [...matchList, [item.node.name, item.node.image]]
    })
  }

  let output = matchList.map((match, index) => (
    <PhotoLink to={match[0]} key={match[0]}>
      {/* <Tag>{match[0]}</Tag> */}
      <Photo
        key={index}
        title={match[1].childImageSharp.id}
        fixed={match[1].childImageSharp.fixed}
      />
    </PhotoLink>
  ))

  return output
}

export default ({ data }) => {
  return (
    <Layout>
      <Container>{renderTagMatches(data)}</Container>
    </Layout>
  )
}
export const query = graphql`
  query shopItems {
    airtable: allAirtable {
      edges {
        node {
          data {
            name
            tags
            image: photo {
              localFiles {
                childImageSharp {
                  id
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
    etsy: allEtsyListingsDownloadCsv {
      edges {
        node {
          name: TITLE
          fields {
            tags
          }
          image {
            childImageSharp {
              id
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
