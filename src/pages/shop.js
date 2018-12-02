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
`
const Details = styled.div`
  display: block;
  color: black;
  font-size: 0.8em;
  text-align: left;
  text-decoration: none;
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
  font-size: 0.8em;
  text-decoration: none;
`

function renderTagMatches(data) {
  let matchList = []

  if (data.airtable !== null) {
    data.airtable.edges.forEach(item => {
      //if (item.node.data.name === 'photoset') {return}
      matchList = [
        ...matchList,
        [item.node.data.name, item.node.data.image.localFiles[0], item.node.data.price],
      ]
      return
    })
  }

  if (data.etsy !== null) {
    data.etsy.edges.forEach(item => {
      matchList = [...matchList, [item.node.name, item.node.image, item.node.price]]
      return
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
      <Details>{ (match[0].length > 24) ? match[0].substring(0,24).concat('...') : match[0]} 
      <Price>{ match[2] > 0 && '$' + match[2] }</Price></Details>
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
            price
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
          price: PRICE
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
