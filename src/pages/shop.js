import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Categories from '../components/categories'
import ProductList from '../components/product-list'

const Container = styled.div`
  display: grid;
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`
const TagNav = styled.div`
  width: 15vw;
  border-right: 1px solid dimgray;
  @media (max-width: 750px) {
    /*grid-area: 1/1/1/2;*/
    width: 90vw;
    border-right: none;
    margin: auto;
    /*padding: .3em;*/
  }
`
const Products = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  padding: 1em;
  text-align: center;
  @media (max-width: 750px) {
    grid-area: 2/1/2/2;
    grid-column: span 2;
    padding: 0;
  }
`

const etsyBuild = data => {
  // data.etsy.edges.node is dirty in the node
  // so filtration by assignment is happening here as well
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
      {/* <Tagbar /> */}
      <Container>
        <TagNav>
          <Categories />
        </TagNav>
        <Products>
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
