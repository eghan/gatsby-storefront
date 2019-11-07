import React from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

import Menu from 'react-burger-menu/lib/menus/slide'
// import tagIcon from '../images/more-horizontal.svg'
import { useSiteTags } from '../hooks/tags'
import { useSiteProducts } from '../hooks/products'

//
//  GOAL: this component should display 0-3 linked image previews for each tag in the passed array
//        the image previews should be selected first by tag count of product, least to most
//        then by tag product count, least to most, with a single pass no repeats
//        so that once an image has been used, it will not be used again unless there are no other options
//

const LinkBox = styled(Link)`
  text-decoration: none;
`
const Photo = styled(Img)`
  display: inline-block;
  border: 1px solid gray;
  /*float: center;*/
  width: 15vw;
  height: 15vw;
  margin: 0.3em;
  /*overflow: hidden;*/

  // method to access picture properties directly
  picture {
    overflow: hidden;
    width: 100px;
  }

  @media (max-width: 1040px) {
    margin: 0.3em;
    width: 40vw;
    height: 40vw;
    /*border: 0px solid plum;*/
  }
`
const TagBlock = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
  border: 1px solid black;
  margin: 0.5em;
  text-align: center;
  background: whitesmoke;
  grid-row: span ${props => props.rows || 3};
  /*grid-gap: 1vw;*/
  /*padding: 1em;*/
`
const Title = styled.div`
  border-bottom: 1px solid gray;
  margin: auto;
  grid-column: span 5;
  font-size: .9em;
  /*padding: 0 .5em;*/
`
const FullBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /*grid-auto-flow: dense;*/
  text-align: center;
  /*padding: 0 0 10em 0;*/
  /*width: 80vw;*/
`

const Related = props => {
  //   const { etsy } = useStaticQuery(
  //     graphql`
  //       query tagsPreview {
  //         etsy: allEtsyListingsDownloadCsv {
  //           edges {
  //             node {
  //               id
  //               name: TITLE
  //               price: PRICE
  //               fields {
  //                 tags
  //               }
  //               image {
  //                 childImageSharp {
  //                   id
  //                   fluid(maxWidth: 300) {
  //                     ...GatsbyImageSharpFluid_withWebp_tracedSVG
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     `
  //   )

  // const { edges } = etsy

  // console.log('test 1', edges)

  let orderedSet = {},
    upperLimit = 1,
    lowerLimit = null,
    count,
    orderedDisplay = new Map()

  let tagsData = {},
    renderData = {},
    tagFilteredProducts = {},
    tagWeight = {},
    orderedTags = new Map()

  // orderedTags is tag count in products

  // for (let element in edges) {
  //   for (let tagNum in edges[element].node.fields.tags) {
  //     let tag = edges[element].node.fields.tags[tagNum]
  //     tagWeight[tag] = tagWeight[tag] + 1 || 1
  //   }
  //   count = edges[element].node.fields.tags.length
  //   if (count > upperLimit) {
  //     upperLimit = count
  //   }
  //   if (count < lowerLimit || lowerLimit == null) {
  //     lowerLimit = count
  //   }
  //   orderedSet[element] = { item: edges[element], tagCount: count }
  // }

  // console.log('test  ', tagWeight)

  // for (let x = 0; x <= Object.keys(tagWeight).length; x++) {
  //   // console.log(x)
  //   for (let item in tagWeight) {
  //     // console.log(item, tagWeight[item])
  //     if (tagWeight[item] === x) {
  //       // console.log('item is ', item)
  //       orderedTags[item] = x
  //     }
  //   }
  // }

  // for (let x = lowerLimit; x <= upperLimit; x++) {
  //   // console.log('X is ', x)
  //   for (let item in orderedSet) {
  //     // console.log( orderedSet[item])
  //     if (orderedSet[item].tagCount == x) {
  //       // console.log('hit one ', x, item)
  //       // console.log('adding ', orderedSet[item].item.node.id, ' to list')
  //       orderedDisplay.set(
  //         orderedSet[item].item.node.id,
  //         orderedSet[item].item.node
  //       )
  //     }
  //   }
  // }

  function RandomItem(length) {
    return Math.floor(Math.random() * length)
  }

  function showThreeRandom(productList) {
    const length = productList.length > 3 ? 3 : productList.length
    const randomNumber = Math.floor(Math.random() * length)
    const randomSet = new Set()
    randomSet.add(RandomItem(length))

    const randomReduce = productList.reduce((accumulator, filter) => {})

    let randomItems = []

    while (randomItems.length < length) {
      randomItems = [...randomItems, RandomItem(length)]
      randomItems = [...new Set(randomItems)] // purge non unique values
    }

    return randomItems.map(x => (
      <LinkBox to={productList[x].name}>
        <Photo
          key={productList[x].id}
          title={`Photo by Eghan Thompson`}
          fluid={productList[x].image.childImageSharp.fluid}
        />
      </LinkBox>
    ))
  }

  //console.log(orderedDisplay)

  // function show() {
  //   console.log('variable is ', ...Object.entries(arguments[0])[0])
  // }
  //
  // show({tagWeight})
  //
  // console.log('entries are', orderedTags)

  for (let item in orderedTags) {
    // console.log('orderedTags', item, orderedTags[item])
    // for each item peal off previews from orderedDisplay
    // only use repeats if needed
  }

  // console.log(orderedDisplay)

  for (let product of orderedDisplay) {
    // console.log('product is ', product)
  }

  // holygoddman Map()'s are awesome
  // console.log('display order ', orderedDisplay)
  // console.log(orderedDisplay.values().next().value)

  const DeSlug = text =>
    text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ')

  //  Could this section be refactored into a pipeline?

  const siteProducts = useSiteProducts(),
    siteTags = useSiteTags()
  let test = {}

  if (!!props.tags) {
    props.tags.forEach(tag => {
      // structure the matching tag data
      tagFilteredProducts = {
        ...tagFilteredProducts,
        [tag]: siteProducts.filter(
          product => product.tags.includes(tag) && !!product.image
        ),
      }
    })
  } else {
    siteTags.map(
      tag =>
        (test[tag[1]] = siteProducts.filter(product =>
          product.tags.includes(tag[1])
        ))
    )

    // tagsData = siteTags
    // tagsData = siteTags.map(item =>
    //   item.tags.map(
    //     tag =>
    //       (tagsData[tag] = siteProducts.filter(siteProduct =>
    //         siteProduct.tags.includes(tag)
    //       ))
    //   )
    // )
  }

  // keeping these seperate for later exclusion of repeat matches if possible

  // console.log('test ',Object.entries(tagsData))

  // let NoRepeats = []

  // console.log('tag data ', tagsData)

  for (let tag of siteTags) {
    // peal off the first three matches and de-nest them
    renderData[tag[1]] = tag[1]

    // tagFilteredProducts.filter(
    //   product => product.tags.includes(tag) && !!product.image
    // )

    // for (let x = 0; x < 3; x++) {
    //   //     if ( tagsData[tag][x] && !(NoRepeats.includes(tagsData[tag][x]) ) {
    //   if (!!tagsData[tag][x]) {
    //     renderData[tag] = tagFilteredProducts.[tag]
    //   }
    // }
  }

  return (
    <FullBlock>
      {/* {JSON.stringify(useSiteProducts())} */}
      {/* {JSON.stringify(tagFilteredProducts)} */}

      {Object.keys(tagFilteredProducts).map(key => (
        <TagBlock to={key} rows={tagFilteredProducts[key].length > 3 ? 3 : tagFilteredProducts[key].length}>
          <Title>{DeSlug(key)}</Title>
          {showThreeRandom(tagFilteredProducts[key])}
          {/* {tagFilteredProducts[key] */}
          {/*   .map((tagObject,index) => ( */}
          {/*     <LinkBox to={tagObject.name}>{index} */}
          {/*       <Photo */}
          {/*         key={tagObject.id} */}
          {/*         title={`Photo by Eghan Thompson`} */}
          {/*         fluid={tagObject.image.childImageSharp.fluid} */}
          {/*       /> */}
          {/*     </LinkBox> */}
          {/*   ))} */}
        </TagBlock>
      ))}
      <br />
    </FullBlock>
  )
}

export default Related
