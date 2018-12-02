import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import PaypalExpressBtn from 'react-paypal-express-checkout'

const Container = styled.div`
  margin: 0rem auto;
  max-width: 90%;
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
  display: inline;
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
const Payment = styled.div`
  padding: 2px 2px;
  float: right;
  display: inline;
`

export default ({ data }) => {
  const client = {
    sandbox:
      'AQEQxTyMZgiKTIdMx5TRiesx-eZeaWMWT7RSMat39X_5V8ok4pU3BvJ_ZKeuEEt8JsW7f7X992jYz_Jg',
    production:
      'AQEQxTyMZgiKTIdMx5TRiesx-eZeaWMWT7RSMat39X_5V8ok4pU3BvJ_ZKeuEEt8JsW7f7X992jYz_Jg',
  }

  const style = {
    label: 'paypal',
    size: 'small', // small | medium | large | responsive
    shape: 'rect', // pill | rect
    color: 'black', // gold | blue | silver | black
  }

  const {
    name,
    description,
    price,
    image,
    fields: { tags = [] },
  } = data.etsy

  const tagList = tags.map((tag, index) => {
    return (
      <Link to={tag} key={index}>
        <Tag key={tag}> {tag} </Tag>
      </Link>
    )
  })
  return (
    <Layout>
      <Container>
        <Photo
          title={`Photo by Eghan Thompson`}
          fixed={image.childImageSharp.fixed}
        />
        <Tagbox>{tagList}</Tagbox>
        <Info>
          <p>{name}</p>
          {description}
        </Info>

        {' '}
        
        <Payment>
          <Price>{price} $</Price>
          <PaypalExpressBtn
            client={client}
            currency={'USD'}
            total={price}
            style={style}
          />
        </Payment>
      </Container>
    </Layout>
  )
}
export const query = graphql`
  query etsyData($name: String!) {
    etsy: etsyListingsDownloadCsv(TITLE: { eq: $name }) {
      name: TITLE
      description: DESCRIPTION
      price: PRICE
      image {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      fields {
        tags
      }
    }
  }
`
