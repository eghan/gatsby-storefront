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
const Photo = styled(Img)`
  padding: 2px 2px;
  float: left;
  display: inline-block;
`

export default ({ data }) => {

console.log(data)


  const { node } = data.allFile.edges[0]

  return (
    <Layout>
      <Container>
        <Photos>
          <div className={node.id}>
            <Photo
              title={`Photo by Eghan Thompson`}
              fixed={node.childImageSharp.fixed}
            />
          </div>
        </Photos>
        <Info>
          <p>{node.name}</p>
        </Info>
      </Container>
    </Layout>
  )
}

export const query = graphql`
query linkedFile($name: String!) {
  allFile(filter: {name: {eq: $name}}) {
    edges {
      node {
        id
        name
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
}
`
