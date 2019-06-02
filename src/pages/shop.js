import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import Tagbar from '../components/tagbar'

const Container = styled.div`
  display: block;
  text-align: center;
  width: 100%;
  /*margin: 0.5rem auto;*/
`
const Details = styled.div`
  margin: 0.3em .5em;
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
  overflow: hidden;
  padding: 0.5em 0.5em;

// method to access picture properties directly
    picture {
     overflow: hidden;
     width: 100px;
    }

  @media (max-width: 1040px) {
    padding: 0em 0em;
    width: 150px;
    height: 150px;
  }
`
const ProductLink = styled(Link)`
  display: inline-block;
  border: 10px solid white;
  border-radius: 10px;
  font-size: 0.8em;
  text-decoration: none;
  color: black;
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

function renderTagMatches(data) {
  let matchList = []

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

  if (data.etsy !== null) {
    data.etsy.edges.forEach(item => {
      matchList = [
        ...matchList,
        [item.node.name, item.node.image, item.node.price],
      ]
      return
    })
  }

  let output = matchList.map((match, index) => {
    // conditional here to fix wierd Netlify SSR build fail triggered by childImageSharp.id being Null
    if (match[1] !== null) {
     return (
        <ProductLink to={match[0]} key={match[0]}>
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
   }
  )
  return output
}

export default ({ data }) => {
  return (
    <Layout>
      <Tagbar />
      <Container>{renderTagMatches(data)}</Container>
    </Layout>
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
          name: TITLE
          price: PRICE
          fields {
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
