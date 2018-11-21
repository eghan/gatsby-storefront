import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0rem auto;
  max-width: 90%;
  border: 1px dashed silver;
`
const Photos = styled.div`
  margin: 0rem auto;
  max-width: 400px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  float: left;
  border: 1px dashed silver;
`
const Info = styled.div`
  padding: 0.05rem 0.5rem;
  margin: 1rem auto;
  display: inline-block;
  flex-direction: column;
  border: 1px dashed silver;
`
const Tag = styled.button`
  padding: 0rem 0.2rem;
  display: inline-block;
  border: 0.5px dashed silver;
  font-size: 0.6em;
  text-decoration: none;
  margin-bottom: 0.1em;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.8s; /* Safari */
  transition-duration: 0.8s;
`
const Price = styled.div`
  float: right;
  font-size: 0.9em;
`
const Tagbox = styled.div`
  float: right;
  max-width: 50%;
`
const Photo = styled(Img)`
  padding: 2px 2px;
  float: left;
  display: inline-block;
`

function renderTagMatches(data) {
  let matchList = []

  if (data.airtable !== null) {
    data.airtable.edges.map(item => {
      matchList = [
        ...matchList,
        [item.node.data.name, item.node.data.image.localFiles[0]]
      ]
    })
  }

  if (data.etsy !== null) {
    data.etsy.edges.map(item => {
      matchList = [...matchList, [item.node.name, item.node.image]]
    })
  }

  let output = matchList.map(match => (
    <Link to={match[0]} key={match[0]}>
      <Tag>{match[0]}</Tag>
      <Photo
        title={match[1].childImageSharp.id}
        fixed={match[1].childImageSharp.fixed}
      />
    </Link>
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
  query airtableTags($tag: String!) {
    airtable: allAirtable(filter: { data: { tags: { in: [$tag] } } }) {
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
    etsy: allEtsyListingsDownloadCsv(
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
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
