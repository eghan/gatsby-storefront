import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

// Expected object shape, props.products
// 
// from etsy data shape
//
//           price: item.node.price,
//           name: item.node.name,
//           tags: item.node.tags,
//           tags: item.node.tags.tags,
//           imageID: item.node.image.childImageSharp.id,
//           imageFluid: item.node.image.childImageSharp.fluid,
//           

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

const ProductList = props => {
  const products = props.products.filter(item => item.name !== undefined)
  // console.log(this.props.products)
  // console.log(JSON.stringify(props), 'testtt')
  // console.log(products)

  return (
    <div>
      {products.map((match, index) => {
        // conditional here to fix wierd Netlify SSR build fail triggered by childImageSharp.id being Null
        if (match !== null) {
          return (
            <ProductLink onClick={() => navigate(match.name)} key={match.imageID}>
              <Preview>
                <Photo
                  style={{ backgroundSize: 'cover' }}
                  key={index}
                  title={match.imageID}
                  fluid={match.imageFluid}
                />
                <Details>
                  {match.name.length > 24
                    ? match.name.substring(0, 24).concat('...')
                    : match.name}
                  <Price>{match.price > 0 && '$' + match.price}</Price>
                </Details>
              </Preview>
            </ProductLink>
          )
        }
      })}
    </div>
  )
}

export default ProductList
