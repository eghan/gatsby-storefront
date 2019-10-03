import React from 'react'
import { navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'         

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
  width: 19vw;
  height: 19vw;
  padding: 0.5em 0.5em;

  @media (max-width: 750px) {
  }

  @media (max-width: 1040px) {
/*    width: 150px;
    height: 150px;*/
  }
`
const ProductLink = styled.div`
  display: inline-block;
  padding: 0.5em;
  font-size: 0.8em;
  text-decoration: none;
  /*color: black;*/
  @media (max-width: 750px) {
    padding: .1em .4em;
  }
`
const Preview = styled.div`
  font-size: 0.8em;
  text-decoration: none;
  color: black;
  @media (max-width: 750px) {
  }
  @media (max-width: 1040px) {
  }
`

const ProductList = props => 
    <>
      { props.products !== undefined &&  props.products.map((match, index) => 
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
    </>

export default ProductList
