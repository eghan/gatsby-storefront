import React from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Menu from 'react-burger-menu/lib/menus/slide'
import tagIcon from "../images/more-horizontal.svg"

// const tagExclude = [
//   'industrial',
//   'mechanical',
//   'Bladerunner',
//   'Mad_Max',
//   'Firefly',
//   'hypoallergenic',
//   'niobium',
//   'Jewelry',
//   'Earrings',
//   'steampunk',
//   'Metal',
// ]

const LinkBox = styled(Link)`
  text-decoration: none;
`
const Photo = styled(Img)`
  display: inline-block;
  border: .5em solid white;
  float: center;
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
const TagBlock = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
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
  const { etsy } = useStaticQuery(
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
                fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    `
  )

const { edges } = etsy
// console.log('test 1', edges)

let orderedSet = {}

for ( let element in edges ) {
  console.log('item1 ', edges[element].node.fields.tags.length)
  orderedSet[element] = { item: edges[element], tagCount: edges[element].node.fields.tags.length }
}

console.log(orderedSet)

const DeSlug = ( text ) => text
          .charAt(0)
          .toUpperCase() + text.slice(1)
          .replace(/_/g, " ")

//  Could this section be refactored into a pipeline?
let tagsData = {},
    renderData = {}

props.tags.forEach( tag => { // structure the matching tag data
  tagsData[tag] = etsy.edges.filter( product => (product.node.fields.tags).includes(tag) )
})
// keeping these seperate for later exclusion of repeat matches if possible

// let NoRepeats = []

for (let tag in tagsData) {  // peal off the first three matches and de-nest them
  for (let x=0; x<3; x++){
    //     if ( tagsData[tag][x] && !(NoRepeats.includes(tagsData[tag][x]) ) {
    if ( tagsData[tag][x] ) {
      renderData[tag] = renderData[tag] ? [ ...renderData[tag], tagsData[tag][x].node ] : [ tagsData[tag][x].node ]
    }
  }
}

return (
  <FullBlock>
  {Object.keys(renderData).map( key => (
    <TagBlock to={key}>
    <Title>{DeSlug(key)}</Title>
    {renderData[key].map( tagObject => (
      <LinkBox to={tagObject.name}>
          <Photo
            key={tagObject.id}
            title={`Photo by Eghan Thompson`}
            fluid={tagObject.image.childImageSharp.fluid}
          />  
      </LinkBox>
      ))}
    </TagBlock>

    ))}

  </FullBlock>
  )
}

export default TagPreview
