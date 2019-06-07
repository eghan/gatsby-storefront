import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import TagPreview from '../components/tag-preview'

const dataFilter = [
  'industrial',
  'mechanical',
  'Bladerunner',
  'Mad_Max',
  'Firefly',
  'hypoallergenic',
  'niobium',
  'Jewelry',
  'Steampunk',
  'steampunk',
  'Metal',
]
const Title = styled.div`
  /*float: center;*/
  text-align: center;
  margin: 1em 0 0 0;
/*  display: block;
  margin-right: 10%;
  margin-left: 10%;*/
`

export default props => (
  <StaticQuery

  //This could be a filtered query but 'sourceAirtable' is munging up the graphql fields so... untill patch

    query={graphql`
      query taglist {
        allSitePage {
          edges {
            node {
              context {
                name
              }
            }
          }
        }
      }
    `}

// IMPORTANT:  context is now missing 'tags' which should sit below name for line 65

// function ThrowError(message){
//   console.log('ERROR: ', message)
//   }


    render={data => {
      // console.log(data)

      // add OR pattern failure smoothing, consider error reporting with || ThrowError('context has no name') 
      // ( element => (element.node.context.name || '') == "Tags" )  // how is this even a thing?
      const rawData = data.allSitePage.edges
        .filter( element => element.node.context.name === "Tags")
     
      const filteredData = rawData[0].node.context.tags
        .filter( element => !(dataFilter.includes(element)) )

// console.log('TEST3', filteredData)
      // console.log('test2', target[0].node.context.Tags)

      return (
        <Layout>
          <Title>Elements:</Title>
          {/* <div>{data.sitePage.context.discription}</div> */}


          <TagPreview tags={filteredData} /> 


        </Layout>
      )
    }}
  />
)
