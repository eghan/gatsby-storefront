import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

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
const Content = styled.div`
  float: center;
  text-align: center;
  border: 0.5px dashed silver;
  display: block;
  margin-right: 10%;
  margin-left: 10%;
`

const Tag = styled.button`
  border: 0.5px dashed silver;
  font-size: 1.2em;
  text-decoration: none;
  padding: 10px;
  &:focus {
    outline: 0;
  }
  &:hover {
    border: 0.5px solid black;
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.6s; /* Safari */
  transition-duration: 0.6s;
`
const TagLink = styled(Link)`
  padding: 2px;
`


export default props => (
  <StaticQuery
    // variables={this.props.pageContext.name}
    query={graphql`
      query tags {
        sitePage(context: { name: { eq: "Tags" } }) {
          context {
            name
            discription
            Tags
          }
        }
      }
    `}
    render={data => {
      console.log(data)

      const tagList = data.sitePage.context.Tags
        .filter(t => !tagExclude.includes(t))
        .map((tag, index) => {
          let link = tag
          tag =
            tag
              .replace(/_/g, ' ')
              .charAt(0)
              .toUpperCase() + tag.slice(1)
          return (
            <TagLink to={link} key={index}>
              <Tag key={tag}> {tag} </Tag>
            </TagLink>
          )
        })

      return (
        <Layout>
          <Content>
          <div>{data.sitePage.context.name}:</div>
          <div>{data.sitePage.context.discription}</div>
          {tagList}
        </Content>
        </Layout>
      )
    }}
  />
)
