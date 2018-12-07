import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import { Flex, Box } from '@rebass/grid'
import PaypalExpressBtn from 'react-paypal-express-checkout'

const Container = styled(Flex)`
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
  padding: .01rem .6rem;
  display: inline-block;
  border: 0.5px dashed silver;
  font-size: 0.6em;
  text-decoration: none;
  margin-bottom: 0.01em;
  &:focus {
    outline: 0;
  }
  &:hover {

  border: 0.5px solid black;
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
  width: 60%;
  text-align: center;
  float: left;

  border: 0.5px dashed silver;
`
const Photo = styled(Img)`
  padding: 2px 2px 5px 5px;
  display: inline-block;
  float: right;
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
          <Box width={1 / 2} px={2} pr={18} p={5} alignSelf='flex-end'>
            <Photo
              title={`Photo by Eghan Thompson`}
              fixed={image.childImageSharp.fixed}
            />
          </Box>
          <Box width={1 / 2} px={2} p={5}>
            <Info>
              <p>{name}</p>
              {description}
            </Info>
            {' '}
            <Tagbox>{tagList}</Tagbox>
            <Payment>
              <Price>{price} $</Price>
              <h5>free shipping</h5>
              <PaypalExpressBtn
                client={client}
                currency={'USD'}
                total={price}
                style={style}
              />
            </Payment>
          </Box>
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
          fixed(width: 500) {
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
