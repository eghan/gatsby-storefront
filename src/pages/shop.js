import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { Container, Products } from '../utils/global'
import { useSiteProducts } from '../hooks/products'
import { Categories } from '../components/categories'
import ProductList from '../components/product-list'
import Related from '../components/related'

const etsyBuild = data => {
  // data.etsy.edges.node is dirty in the node
  // so filtration by assignment is happening
  let structuredEtsy = data.etsy.edges.map(item => {
    return {
      price: item.node.price,
      name: item.node.name,
      tags: item.node.tags,
      imageID: item.node.image.childImageSharp.id,
      imageFluid: item.node.image.childImageSharp.fluid,
    }
  })

  return structuredEtsy
}

const airtableBuild = data => {
  // Airtable returns bad object values, clean them out
  let structuredAirtable = data.airtable.edges
    .filter(item => item.node !== undefined)
    .map(item => item.node.data)
    .filter(item => item.image !== null)
    .filter(item => item.price !== null)
    .filter(item => item.image.localFiles !== undefined)
    .filter(item => item.image.localFiles[0].childImageSharp !== null)
    // dirty dirty data
    .map(item => {
      return {
        price: item.price || 'inqure for pricing',
        name: item.name,
        tags: item.tags || [],
        imageID: item.image.localFiles[0].childImageSharp.id,
        imageFluid: item.image.localFiles[0].childImageSharp.fluid,
      }
    })

  return structuredAirtable
}

export default ({ data }) => {
  return (
    <>
      <Container>
        <Categories />
        <Products>
        {/* {useSiteProducts().map(x => <div>{x.name}</div>)} */}
          <Related />
          <ProductList products={airtableBuild(data)} />
          <ProductList products={etsyBuild(data)} />
        </Products>
      </Container>
    </>
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
    etsy: allEtsyListingsDownloadCsv {
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
