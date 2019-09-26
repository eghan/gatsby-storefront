import React from 'react'
import { graphql } from 'gatsby'

import ProductDisplay from '../components/product'

export default ({ data }) => {
  const {
    id,
    name,
    description,
    price,
    image,
    fluid = image.localFiles[0].childImageSharp.fluid,
    imageA = null,
    imageB = null,
    tags,
  } = data.airtable.data

  const product = {
    id,
    name,
    description,
    price,
    image,
    fluid,
    tags,
  }

  return <ProductDisplay product={product} />
}

export const query = graphql`
  query airtableData($name: String!) {
    airtable(data: { name: { eq: $name } }) {
      data {
        id
        name
        discription
        price
        tags
        image: photo {
          localFiles {
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
