import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0rem auto;
  max-width: 90%;
  border: 1px dashed silver;
`
const Photos = styled.div`
  margin: 0rem auto;
  max-width: 400px;
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  float: left;
  border: 1px dashed silver;
`
const Info = styled.div`
  padding: 0.05rem 0.5rem;
  margin: 1rem auto;
  display: inline-block;
  flex-direction: column;
  border: 1px dashed silver;
`
const Tag = styled.button`
  padding: 0rem 0.2rem;
  display: inline-block;
  border: 0.5px dashed silver;
  font-size: 0.6em;
  text-decoration: none;
  margin-bottom: 0.1em;
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.8s; /* Safari */
  transition-duration: 0.8s;
`
const Price = styled.div`
  float: right;
  font-size: 0.9em;
`
const Tagbox = styled.div`
  float: right;
  max-width: 50%;
`
const Photo = styled(Img)`
  padding: 2px 2px;
  float: left;
  display: inline-block;
`

export default ({ data }) => {
  // eslint-disable-next-line
  const { name, discription, price, tags = [], photo } = data.airtable.data
  // gives tags array default value in case graphql returns non value
  // TODO: this may be refactorable using destructuring and default values
  // gatsby(JSX) build fails(passes develop) when tags is not present
  // see issue #3344 https://github.com/gatsbyjs/gatsby/issues/3344


  const tagList = data.airtable.data.tags
    && data.airtable.data.tags.map(tag => (
        <Link to={tag}>
          <Tag key={tag}> {tag} </Tag>
        </Link>
      ))

  return (
    <Layout>
      <Container>
        <Photos>
          <div className={photo.id}>
            <Photo
              title={`Photo by Eghan Thompson`}
              fixed={photo.localFiles[0].childImageSharp.fixed}
            />
          </div>
        </Photos>
        <Info>
          {discription}
          <p>{name}</p>
          <Tagbox>{tagList}</Tagbox>
        </Info>
        <Price>{price} $</Price>
      </Container>
    </Layout>
  )
}
export const query = graphql`
  query airtableData($name: String!) {
    airtable(data: { name: { eq: $name } }) {
      data {
        name
        discription
        price
        tags
        photo {
          id
          localFiles {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`
