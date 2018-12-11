import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import { Flex, Box } from '@rebass/grid'
import PaypalExpressBtn from 'react-paypal-express-checkout'

const Container = styled(Flex)`
  flex-flow: row wrap;
  border: 1px dashed red;
`
const Info = styled(Box)`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  margin: 1rem auto;
`
const Tag = styled.button`
  border: 0.5px dashed silver;
  font-size: 0.6em;
  text-decoration: none;
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
const Price = styled(Box)`
  font-size: 0.8em;
`
const Tagbox = styled(Box)`
  width: 60%;
  text-align: center;
  float: left;
`
const Photo = styled(Img)`
  float: right;
`
const Payment = styled(Flex)`
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`
const TagLink = styled(Link)`
  padding: 0.01rem 0.06rem;
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
    size: 'responsive', // small | medium | large | responsive
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
      <TagLink to={tag} key={index}>
        <Tag key={tag}> {tag} </Tag>
      </TagLink>
    )
  })
  return (
    <Layout>
      <Container>
        <Box width={1 / 2} pr={4} pt={3} alignSelf="flex-end">
          <Photo
            title={`Photo by Eghan Thompson`}
            fixed={image.childImageSharp.fixed}
          />
        </Box>
        <Box width={1 / 2} px={12} p={5} alignSelf="flex-start">
          <Box>{name}</Box>
          <Info>{description}</Info>
          <Tagbox>{tagList}</Tagbox>
          <Payment>
            <Price>{price} $</Price>
            <Price>free shipping</Price>
            <Box pt={2}>
              <PaypalExpressBtn
                client={client}
                currency={'USD'}
                total={Number(price)}
                style={style}
              />
            </Box>
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
