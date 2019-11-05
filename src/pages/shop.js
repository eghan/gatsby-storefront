import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { Container, Products } from '../utils/global'
import { useSiteProducts } from '../hooks/products'
import { Categories } from '../components/categories'
import ProductList from '../components/product-list'
import Related from '../components/related'

const Grid = styled.div`
  display: grid;
  background: palevioletred;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(15vw);
  grid-auto-flow: row dense;
  grid-gap: 1vw;
  border: 1px solid black;
  padding: 1em;
`

const GridItemOne = styled.div`
  display: grid;
  /*height: 15vw;*/
  grid-column: span 3;
  border: 5px solid black;
  background: pink;
`
const GridItemTwo = styled.div`
  grid-column: span 2;
  grid-row: span 2;
  border: 2px dashed black;
`
const GridItemThree = styled.div`
  grid-column: span 2;
  border: 3px dotted black;
`
const GridItemFour = styled.div`
  grid-row: span 2;
  border: 3px dotted plum;
`
const Blank = styled.div`
  border: 2px dashed plum;
`

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

const ProductGrid = () => {
  return (
    <>
    <Grid>
      <GridItemOne>item one</GridItemOne>
      <GridItemThree>item three</GridItemThree>
      <GridItemFour>item four</GridItemFour>
      <GridItemOne>item one</GridItemOne>
      <GridItemFour>item four</GridItemFour>
      <GridItemThree>item fuck</GridItemThree>
      <Blank>item fill two</Blank>
      <Blank>item fill one</Blank>
      <GridItemTwo>item fuck</GridItemTwo>
    </Grid>
  </>
  )
}

export default ({ data }) => {
  return (
    <>
      <Container>
        <Categories />
        <Products>
        {/* {useSiteProducts().map(x => <div>{x.name}</div>)} */}
          <Related />
          <ProductGrid />
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
