import React from 'react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import styled from 'styled-components'

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

  console.log('etsy', etsy.edges)

  // let tagMatches = props.tags.map( tag => {
  //   console.log(tag)
  //   etsy.edges.forEach( product => console.log(product) )
  // }
  
  // console.log(tagMatches)

  // for (let product in etsy.edges) {
  //     if ( etsy.edges[product].node.fields.tags.some(tag => props.tags.includes(tag)) ) {
  //       console.log('Match', etsy.edges[product])
  //     }
  // }


  return (
    <h1>{props.tags}</h1>
    )
}

// const TagPreview = (props) => {
//   const { sitePage, etsy } = useStaticQuery(
//     graphql`
//       query tagsPreview {
//         sitePage(context: { name: { eq: "Tags" } }) {
//           context {
//             name
//             discription
//             Tags
//           }
//         }
//         etsy: allEtsyListingsDownloadCsv {
//       edges {
//         node {
//           name: TITLE
//           price: PRICE
//           fields {
//             tags
//           }
//           image {
//             childImageSharp {
//               id
//               fluid(maxWidth: 400) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//     }
//       }
//     `
//   )
//   console.log(etsy.edges[0], " test")
//   return(
//     <Preview>
//       <h3>{sitePage.context.discription}</h3>
//     </Preview>
// 
//     )
// }

export default TagPreview
