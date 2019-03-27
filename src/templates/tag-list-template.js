import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import TagPreview from '../components/tag-preview'

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
  'Steampunk',
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

  //This should be a filtered query but 'sourceAirtable' is munging up the graphql fields so... untill patch

    query={graphql`
      query taglist {
        allSitePage {
          edges {
            node {
              context {
                name
                Tags
              }
            }
          }
        }
      }
    `}



    render={data => {
      // console.log(data)

      const target = data.allSitePage.edges.filter( element => element.node.context.name == "Tags")

      // console.log('test2', target[0].node.context.Tags)

      return (
        <Layout>
          <Title>Elements:</Title>
          {/* <div>{data.sitePage.context.discription}</div> */}
          <TagPreview tags={target[0].node.context.Tags} /> 
        </Layout>
      )
    }}
  />
)
