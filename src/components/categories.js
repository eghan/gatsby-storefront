import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'


import { Button } from '../utils/global'

const SideBar = styled.div`
  padding: 1em;
/*  @media(750px){
    display: none;
  }*/
`
const TagDisplay = styled(Button)`
  padding: 0.15em 0.4em;
  font-size: 0.9em;
`
const Title = styled.div`
  font-size: 1.1em;
  border-bottom: 2px solid black;
  margin: 0 0 1em 0;
`

const Categories = props => {
  const { etsy } = useStaticQuery(
    graphql`
      query Categories {
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

  let orderedSet = {},
    upperLimit = 1,
    lowerLimit = null,
    count,
    orderedDisplay = new Map()

  let tagsData = {},
    renderData = {},
    tagWeight = {},
    orderedTags = new Map()

  const DeSlug = text =>
    text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ')

  //  Could this section be refactored into a pipeline?

  if (props.tags) {
    props.tags.forEach(tag => {
      // structure the matching tag data
      renderData[tag] = etsy.edges.filter(product =>
        product.node.fields.tags.includes(tag)
      )
    })
  } else {
    renderData = etsy.edges
  }
  const tagList = renderData.map(product => [...product.node.fields.tags])

  const mergedTags = [].concat(...tagList)

  const tagCount = mergedTags.map(value => [
    mergedTags.filter(x => x === value).length,
    value,
  ])

  const tagsUnique = tagCount.filter(tag => tag[0] < renderData.length, [])

  const tagsUniqueCounted = tagsUnique.filter(
    (s => a => (j => !s.has(j) && s.add(j))(JSON.stringify(a)))(new Set())
  )

  const tagsFiltered = tagsUniqueCounted.filter( (tag,i) => tagsUniqueCounted.indexOf(tag) === i )

  return (
    <SideBar>
      <Title>Categories: </Title>
      {tagsFiltered.map(tag => (
        <TagDisplay
          onClick={() => {
            navigate(tag[1])
          }}
        >
          {/* {tag[1]} has {tag[0]} */}
          {DeSlug(tag[1])}
          {/* {tag[0]} */}
        </TagDisplay>
      ))}
    </SideBar>
  )
}

export default Categories
