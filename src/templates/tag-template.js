import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Location } from '@reach/router'

// import { Categories, CategoriesMobile } from '../components/categories'
// import ProductList from '../components/product-list'
//
// import useSiteTags from '../hooks/tags'

import { Container, Products } from '../utils/global'
import { Categories } from '../components/categories'
import ProductList from '../components/product-list'

const Title = styled.div`
  border-bottom: 1px solid lightgray;
  @media (max-width: 750px) {
    font-size: 0.8em;
    padding: 0 0 0.4em 0;
    margin: 0 0 .4em 0;
    text-align: center;
  }
`

const etsyBuild = data => {
  // data.etsy.edges.node is dirty in the node
  // so filtration by assignment is happening
  const structuredEtsy = data.etsy.edges.map(item => {
    return {
      price: (item.node.price = 0),
      name: item.node.name,
      tags: (item.node.tags = []),
      imageID: item.node.image.childImageSharp.id,
      imageFluid: item.node.image.childImageSharp.fluid,
    }
  })

  return structuredEtsy
}

const airtableBuild = data => {
  // Airtable returns bad object values, clean them out
  const structuredAirtable = data.airtable.edges
    .filter(item => item.node !== undefined)
    .map(item => item.node.data)
    .filter(item => item.image !== null)
    .filter(item => item.price !== null)
    .filter(item => item.image.localFiles !== undefined)
    .filter(item => item.image.localFiles[0].childImageSharp !== null)
    // dirty dirty data
    .map(item => {
      return {
        price: (item.price = 'inqure for pricing'),
        name: item.name,
        tags: (item.tags = []),
        imageID: item.image.localFiles[0].childImageSharp.id,
        imageFluid: item.image.localFiles[0].childImageSharp.fluid,
      }
    })

  return structuredAirtable
}

export default ({ data }) => {
  return (
    <>
      {/* <Tagbar /> */}
      <Container>
        <Categories />
        <Products>
          <Location>
            {({ location }) => {
              return (
                <Title>
                  Pieces tagged{' '}
                  {location.pathname
                    .replace(/\//g, '')
                    .replace(/_/g, ' ')
                    .replace(/%20/g, ' ')}
                </Title>
              )
            }}
          </Location>
          {airtableBuild(data).length > 0 && (
            <ProductList products={airtableBuild(data)} />
          )}
          {etsyBuild(data).length > 0 && (
            <ProductList products={etsyBuild(data)} />
          )}
        </Products>
      </Container>
    </>
  )
}

export const query = graphql`
  query productTags($tag: String!) {
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
          id
          name: TITLE
          price: PRICE
          tags: fields {
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
