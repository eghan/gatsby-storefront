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
const Preview = styled.div`
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
  /*border: 0.5px dashed silver;*/
  display: block;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  background: 'white';
  text-decoration: none;
  /*border-bottom: 0.1px solid silver;*/
`
const Photo = styled(Img)`
  display: inline-block;
  border: 1.5em solid white;
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

const Tag = styled.div`
  display: inline-block;
  color: black;
  border: 0.5px dashed white;
  font-size: 0.7em;
  text-decoration: none;
  padding: 0.25em;
  &:focus {
    outline: 0;
  }
  &:hover {
    border: 0.5px solid black;
    /*background-color: #f5f5f5;*/
  }
  -webkit-transition-duration: 0.6s; /* Safari */
  transition-duration: 0.6s;  
  @media (max-width: 750px) {
    font-size: 0.5em;
  }
`
const TagLink = styled(Link)`
  text-decoration: none;
`
const TagTitle = styled(Link)`
  display: inline-block;
  font-size: 1.1em;
  color: black;
  text-decoration: none;
`

var burgerTags = []
// console.log(this, 'props')

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

let tagsData = {},
    renderData = {}

props.tags.forEach( tag => { // structure the matching tag data
  tagsData[tag] = etsy.edges.filter( product => (product.node.fields.tags).includes(tag) )
})

// console.log( Object.keys(tagsData), tagsData )

for (let tag in tagsData) {  // peal off the first three matches and de-nest them
  renderData[tag] = [ tagsData[tag][0].node, tagsData[tag][1].node, tagsData[tag][2].node ]
}

const tagRender = Object.keys(renderData).map( tag => { 
  // console.log(renderData[tag][0])
  return renderData[tag]
} 
  )

const TagOutput = ( tag ) => tagRender[tag].map( tag => 
          <Photo
            key={tag.id}
            title={`Photo by Eghan Thompson`}
            fluid={tag.image.childImageSharp.fluid}
          />
  )
console.log(TagOutput)
// 
// const RenderTag = ( tag ) => {
//   return (
//     <h1>{tag}<h1>
//     {TagOutput(tag)}
//       )
// }

  return (
    <div>
    <h1>{props.tags}</h1>
    {TagOutput(1)}
    </div>
    )
}

export default TagPreview
