import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Location } from '@reach/router'

import { Categories, CategoriesMobile } from '../components/categories'
import { Tags } from '../utils/global'

const Container = styled.div`
  /*display: block;*/
  display: grid;
  /*text-align: center;*/
  /*grid-template-columns: 1fr 1fr;*/
  @media (max-width: 750px) {
    background: peru;
    display: block;
    /*border: 2px solid plum;*/
    text-align: center;
  }
`
const Products = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  width: 85vw;
  position: grid;
  @media (max-width: 750px) {
    width: 95vw;
  }
`

const Details = styled.div`
  margin: 0.3em 0.3em;
  display: block;
  font-size: 1em;
  text-align: left;
  text-decoration: none;
  color: black;
  @media (max-width: 750px) {
    display: none;
  }
`
const Title = styled.p`
  padding: .6em 0 0 0;
  text-transform: capitalize;  
  border-bottom: 1px solid lightgray;

  @media (max-width: 750px) {
    padding: 0;
    text-align: center;
  }
`
const Price = styled.div`
  float: right;
`
const Photo = styled(Img)`
  width: 300px;
  height: 300px;
  padding: 0.5em 0.5em;
  @media (max-width: 750px) {
    padding: 0em;
    width: 40vw;
    height: 40vw;
  }
`
const PhotoLink = styled(Link)`
  padding: 0 1em;
  display: inline-block;
  font-size: 0.8em;
  text-decoration: none;
  color: black;
  @media (max-width: 750px) {
    padding: 0 0.2em;
  }
`

function renderTagMatches(data) {
  let matchList = []

  if (data.airtable !== null) {
    data.airtable.edges.forEach(item => {
      //if (item.node.data.name === 'photoset') {return}
      matchList = [
        ...matchList,
        [
          item.node.data.name,
          item.node.data.image.localFiles[0],
          item.node.data.price,
        ],
      ]
      return
    })
  }

  if (data.etsy !== null) {
    data.etsy.edges.forEach(item => {
      matchList = [
        ...matchList,
        [item.node.name, item.node.image, item.node.price],
      ]
      return
    })
  }

  let output = matchList.map((match, index) => (
    <PhotoLink to={match[0]} key={match[0]}>
      <Photo
        style={{ backgroundSize: 'cover' }}
        key={index}
        title={match[1].childImageSharp.id}
        fluid={match[1].childImageSharp.fluid}
      />
      <Details>
        {match[0].length > 24
          ? match[0].substring(0, 24).concat('...')
          : match[0]}
        <Price>{match[2] > 0 && '$' + match[2]}</Price>
      </Details>
    </PhotoLink>
  ))

  return output
}

export default ({ data }) => {
  return (
    <>
      <Container>
        <Categories />
        <Products>
          <Location>
            {({ location }) => {
              return (
                <Title>
                  {location.pathname
                    .replace(/\//g, '')
                    .replace(/_/g, ' ')
                    .replace(/%20/g, ' ')}
                  :
                </Title>
              )
            }}
          </Location>
          {renderTagMatches(data)}
        </Products>
      </Container>
    </>
  )
}
export const query = graphql`
  query airtableTags($tag: String!) {
    airtable: allAirtable(filter: { data: { tags: { in: [$tag] } } }) {
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
                  fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
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
          price: PRICE
          fields {
            tags
          }
          image {
            childImageSharp {
              id
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
