import React from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Menu from 'react-burger-menu/lib/menus/slide'
import tagIcon from "../images/more-horizontal.svg"

const tagExclude = [
  'industrial',
  'mechanical',
  'Bladerunner',
  'Mad_Max',
  'Firefly',
  'hypoallergenic',
  'niobium',
  'Jewelry',
  'Earrings',
  'steampunk',
  'Metal',
]

const Photo = styled(Img)`
  display: inline-block;
  border: .5em solid white;
  width: 15vw;
  height: 15vw;
  overflow: hidden;

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
const TagBlock = styled.div`
  display: inline-block;
  border: 1px solid black;
  margin: .5em;
  text-align: center;
  padding: .5vw .5vw;
`
const Title = styled.div`
  border: 1px solid black;
  margin: auto;
  padding: 0 .5em;
`
const FullBlock = styled.div`
  width: 100vw;
  text-align: center;
  padding: .5em;
`

const TagPreview = props => {
  const { sitePage, etsy } = useStaticQuery(
    graphql` query tagsPreview {
      etsy: allEtsyListingsDownloadCsv {
        edges {
          node {
            id
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
  )

//  Could this section be refactored into a pipeline?
let tagsData = {},
    renderData = {}

props.tags.forEach( tag => { // structure the matching tag data
  tagsData[tag] = etsy.edges.filter( product => (product.node.fields.tags).includes(tag) )
})
// keeping these seperate for later exclusion of repeat matches if possible
for (let tag in tagsData) {  // peal off the first three matches and de-nest them
  renderData[tag] = [ tagsData[tag][0].node, tagsData[tag][1].node, tagsData[tag][2].node ]
}

return (
  <FullBlock>
  {Object.keys(renderData).map( key => (
    <TagBlock>
    <Title>{key}</Title>
    {renderData[key].map( tagObject => (
          <Photo
            key={tagObject.id}
            title={`Photo by Eghan Thompson`}
            fluid={tagObject.image.childImageSharp.fluid}
          />
      ))}
    </TagBlock>

    ))}

  </FullBlock>
  )
}

export default TagPreview
