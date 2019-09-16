import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

// import Tagbar from './tagbar'
import { Button, TagButton } from '../utils/global'
// import MenuModal from './menu-modal'

const Box = styled.div`
  padding: 0.7em;
  display: grid;

  @media (max-width: 750px) {
    padding: 0.3em;
    width: 90vw;
  }
`
const ButtonMobileLeft = styled(Button)`
  display: none;
  @media (max-width: 750px) {
    display: inline;
    font-size: 0.7em;
  }
`
const ButtonMobileRight = styled(Button)`
  display: none;
  @media (max-width: 750px) {
    display: inline;
    font-size: 0.7em;
    float: right;
  }
`
const InquiryButton = styled(Button)`
  margin: 2em;
  font-size: 0.9em;
`
const Tags = styled.div`
  margin: 0 0 .5em 0;
  border-bottom: 1px solid lightgray;
`
const SideBar = styled.div`
  /*display: inline;*/
  /*background: gold;*/
  /*padding: 1em;*/
  @media (max-width: 750px) {
    display: none;
    width: 0em;
  }
`
// const TagMenu = styled(MenuModal)`
//   display: none;
//   background: gray;
//   @media (max-width: 750px) {
//     display: inline;
//   }
// `
const CategoriesMobile = () => <div>hihi</div>
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

  const tagsFiltered = tagsUniqueCounted.filter(
    (tag, i) => tagsUniqueCounted.indexOf(tag) === i
  )

  return (
    <Box>
      {/* <TagMenu categories={tagsFiltered}> */}
      {/*   <ButtonMobileLeft>search by tag</ButtonMobileLeft> */}
      {/* </TagMenu> */}
      {/* <ButtonMobileRight onClick={() => navigate('/contact')}> */}
      {/*   custom orders */}
      {/* </ButtonMobileRight> */}
      <SideBar>
        <Tags>Tags:</Tags>

        {tagsFiltered.map(tag => (
          <TagButton
            onClick={() => {
              navigate(tag[1])
            }}
          >
            {/* {tag[1]} has {tag[0]} */}
            {DeSlug(tag[1])}
            {/* {tag[0]} */}
          </TagButton>
        ))}
        <InquiryButton onClick={() => navigate('/contact')}>
          custom orders
        </InquiryButton>
      </SideBar>
    </Box>
  )
}

export { Categories, CategoriesMobile }
