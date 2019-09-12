import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Categories from '../components/categories'
import ProductList from '../components/product-list'

const Container = styled.div`
  /*display: block;*/
  display: grid;
  /*text-align: center;*/
  /*width: 100%;*/
  /*background: plum;*/
  /*grid-template-columns: 1fr;*/
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`

const CategoryDisplay = styled(Categories)``

const TagNav = styled.div`
  width: 15vw;
  border-right: 1px solid dimgray;
  /*background: hotpink;*/
  /*display: grid;*/
  /*grid-area: 1/1/1/2;*/
  @media (max-width: 750px) {
    grid-area: 1/1/1/2;
    grid-column: span 2;
  }
`
const Products = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  /*width: 85vw;*/
  padding: 1em;
  /*background: peru;*/
  text-align: center;
  @media (max-width: 750px) {
    /*background: peru;*/
    /*padding: .5em;*/
    grid-area: 2/1/2/2;
    grid-column: span 2;
  }
`

const Details = styled.div`
  margin: 0.3em 0.5em;
  display: block;
  font-size: 1em;
  text-align: left;
  @media (max-width: 750px) {
    display: none;
  }
`
const Price = styled.div`
  float: right;
`
const Photo = styled(Img)`
  width: 300px;
  height: 300px;
  /*overflow: hidden;*/
  padding: 0.5em 0.5em;

  @media (max-width: 750px) {
    width: 250px;
    height: 250px;
  }
  // method to access picture properties directly
  /*  picture {
    overflow: hidden;
    width: 100px;
  }*/

  @media (max-width: 1040px) {
    /*padding: .5em;*/
    width: 150px;
    height: 150px;
  }
`
const ProductLink = styled.div`
  display: inline-block;
  /*border: 10px solid white;*/
  /*border-radius: 10px;*/
  padding: 0.5em;
  font-size: 0.8em;
  text-decoration: none;
  color: black;
  @media (max-width: 750px) {
    padding: 0 0.2em;
  }
`
const Preview = styled.div`
  font-size: 0.8em;
  text-decoration: none;
  color: black;
  @media (max-width: 750px) {
  }
  @media (max-width: 1040px) {
    /* in progress */
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
  // Airtable plugin returns bad nodes, clean them out
  let structuredAirtable = data.airtable.edges
    .filter(item => item.node !== undefined)
    .map(item => item.node.data)
    .filter(item => item.image !== null)
    .filter(item => item.image.localFiles !== undefined)
    .filter(item => item.image.localFiles[0].childImageSharp !== null)
    // dirty dirty data
    .map(item => {
      return {
        price: item.price || 'inqure for pricing',
        name: item.name,
        tags: item.tags || [],
        imageID: item.image.localFiles[0].childImageSharp.id,
        imageFluid: item.image.localFiles[0].childImageSharp.fluid
      }
    })

  return structuredAirtable
}
function renderTagMatches(data) {
  let matchList = []
  let filterer = null
  // console.log(JSON.stringify(Object.keys(data)))
  // AIRTABLE MATCH LIST, INCLUED ONCE AIRTABLE PRODUCT DATA IS SYNCRONIZED ***!!!
  // if (data.airtable !== null) {
  //   data.airtable.edges.forEach(item => {
  //     //if (item.node.data.name === 'photoset') {return}
  //     if (item.node.data.price !== null) {
  //       matchList = [
  //         ...matchList,
  //         [
  //           item.node.data.name,
  //           item.node.data.image.localFiles[0],
  //           item.node.data.price,
  //         ],
  //       ]
  //       return
  //     }
  //   })
  // }
  let structuredProducts = []

  if (typeof data.etsy.edges !== 'undefined') {
    data.etsy.edges.forEach(item => {
      // if (filterer !== null){
      //   console.log('filter happened')
      // }
      structuredProducts = [
        ...structuredProducts,
        {
          price: item.node.price,
          name: item.node.name,
          tags: item.node.tags,
        },
      ]
      matchList = [
        ...matchList,
        [item.node.name, item.node.image, item.node.price],
      ]
    })
  }
  // console.log(structuredProducts)

  let output = matchList.map((match, index) => {
    // conditional here to fix wierd Netlify SSR build fail triggered by childImageSharp.id being Null
    if (match[1] !== null) {
      return (
        <ProductLink onClick={() => navigate(match[0])} key={match[0]}>
          <Preview>
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
          </Preview>
        </ProductLink>
      )
    }
  })
  return output
}

export default ({ data }) => {
  return (
    <>
      {/* <Tagbar /> */}

      <Container>
        <TagNav>
          <CategoryDisplay />
        </TagNav>
        <Products>
          {/* {JSON.stringify( */}
          {/*   Object.keys( */}
          {/*     data.airtable.edges[0].node.data.image.localFiles[0] */}
          {/*       .childImageSharp */}
          {/*   ) */}
          {/* )} */}
          {/* {JSON.stringify(airtableBuild(data))} */}
          {/*  */}
          <ProductList products={airtableBuild(data)} />
          <ProductList products={etsyBuild(data)} />
          {/* {renderTagMatches(data)} */}
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
