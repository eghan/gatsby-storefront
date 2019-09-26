import React from 'react'
import { graphql } from 'gatsby'

import ProductDisplay from '../components/product'

export default ({ data }) => {

  const {
    // destructure and defaults isolated for possible future changes
    id,
    name,
    description,
    price,
    image,
    fluid = image.childImageSharp.fluid,
    imageA = null,
    fluidA = imageA !== null ? imageA.childImageSharp.fluid : null,
    imageB = null,
    fluidB = imageB !== null ? imageB.childImageSharp.fluid : null,
    fields: { tags = [] },
  } = data.etsy

  const product = {
    id,
    name,
    description,
    price,
    image,
    fluid,
    imageA,
    fluidA,
    imageB,
    fluidB,
    tags,
  }

  return <ProductDisplay product={product} />
}
export const query = graphql`
  query etsyData($name: String!) {
    etsy: etsyListingsDownloadCsv(TITLE: { eq: $name }) {
      id
      name: TITLE
      description: DESCRIPTION
      price: PRICE
      image {
        childImageSharp {
          fluid(quality: 100, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      imageA {
        childImageSharp {
          fluid(quality: 80, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      imageB {
        childImageSharp {
          fluid(quality: 80, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      fields {
        tags
      }
    }
  }
`
