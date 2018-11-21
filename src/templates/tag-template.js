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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  float: left;
  border: 1px dashed silver;
`
const Info = styled.div`
  padding: 0.05rem 0.5rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  border: 1px dashed silver;
`
const Tag = styled.button`
  padding: 0rem 0.2rem;
  display: inline-block;
  border: 1px dashed silver;
  font-size: 0.6em;
  line-height: 130%;
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
  float: center;
`
const Photo = styled(Img)`
  float: center;
`

function renderTagNames(data) {
  let tagList = []

  if (data.airtable !== null) {
    data.airtable.edges.map(item => {
      tagList = [...tagList, item.node.data.name]
    })
  }

  if (data.etsy !== null) {
    data.etsy.edges.map(item => {
      tagList = [...tagList, item.node.name]
      console.log(item.node.name)
    })
    console.log(data)
  }

  let output = tagList.map(name => (
    <Tag>
      <Link to={name} key={name}>
        {name}
      </Link>
    </Tag>
  ))

  return output
}

export default ({ data }) => {
  const node = [...data.airtable.edges]

  return (
    <Layout>
      <Container>
        {renderTagNames(data)}
        {node.map(({ node: { data: { name, photo } } }) => {
          return (
            <Link to={name} key={name}>
              <Photo
                title={name}
                fixed={photo.localFiles[0].childImageSharp.fixed}
              />
            </Link>
          )
        })}
      </Container>
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
            photo {
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
