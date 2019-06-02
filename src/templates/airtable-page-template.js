import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import Product from '../components/product'

export default ({ data }) => {
  // eslint-disable-next-line
  const { name, discription, price, tags = [], photo} = data.airtable.data

  const product = {
    name,
    discription,
    price,
    tags,
    image: photo.localFiles[0].childImageSharp,
    sizes: photo.localFiles[0].childImageSharp.sizes
  }

  return ( <Product item={product} /> )
}
export const query = graphql`
  query airtableData($name: String!) {
    airtable(data: { name: { eq: $name } }) {
      data {
        name
        discription
        price
        tags
        photo {
          localFiles{
            childImageSharp {
              fluid(quality: 100, maxHeight: 850) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                presentationWidth
                presentationHeight
              }
              sizes(maxHeight: 850) {
                ...GatsbyImageSharpSizes_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`
