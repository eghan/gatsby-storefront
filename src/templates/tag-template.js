import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Location } from '@reach/router'

import Categories from '../components/categories'

const Container = styled.div`
  /*display: block;*/
  display: grid;
  /*text-align: center;*/
  width: 100%;
  grid-template-columns: 1fr 1fr;

  /*margin: 0.5rem auto;*/
`
const CategoryDisplay = styled(Categories)`
  display: block;
  grid-area: 1 / 1 / 1 / 1;
  width: 15vw;
  height: 100vh;
`
const Products = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  width: 85vw;
  padding: 2em;
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
  margin: 0.5em;
  text-transform: capitalize;
`
const Price = styled.div`
  float: right;
`
const Photo = styled(Img)`
  width: 300px;
  height: 300px;
  padding: 0.5em 0.5em;
  @media (max-width: 1040px) {
    padding: 0em 0em;
    width: 125px;
    height: 125px;
  }
`
const PhotoLink = styled(Link)`
  margin: 0.5em 0.5em;
  display: inline-block;
  font-size: 0.8em;
  text-decoration: none;
  color: black;
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
        <CategoryDisplay />
        <Products>
          {' '}
          <Location>
            {({ location }) => {
              return (
                <Title>
                  {location.pathname
                    .replace(/\//g, '')
                    .replace(/_/g, ' ')
                    .replace(/%20/g, ' ')}{' '}
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
