import { useStaticQuery, graphql } from 'gatsby'

import { TagFilter } from '../utils/global'

export const useSiteProducts = () => {
  const data = useStaticQuery(
    graphql`
      query Products {
        etsy: allEtsyListingsDownloadCsv {
          nodes {
            id
            name: TITLE
            description: DESCRIPTION
            price: PRICE
            image {
              childImageSharp {
                fluid(quality: 100, maxHeight: 850) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            fields {
                tags
              }
          }
        }
        allAirtable {
          edges {
            node {
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
                      }                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const ProductsEtsy = data.etsy.nodes

  ProductsEtsy.map(x => x.tags = x.fields.tags) // data shaped to match


  const ProductsAirtable = data.allAirtable.edges
      .filter(datum => datum.node.data.price != null)
      .map(x => x.node.data)

  ProductsAirtable.map(x => x.image.childImageSharp = x.image.localFiles[0].childImageSharp) // data shaped to match

  const Products = [...ProductsAirtable, ...ProductsEtsy]
  return Products
  // return JSON.stringify(Products.map(x => x.name))
}
