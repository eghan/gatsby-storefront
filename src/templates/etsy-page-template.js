import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'
import { Flex, Box } from '@rebass/grid'
import PaypalExpressBtn from 'react-paypal-express-checkout'

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
]

const Container = styled(Flex)`
  flex-flow: row wrap;
  border: 1px dashed red;
`
const Info = styled(Box)`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  /*margin: 1rem auto;*/
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
const PreviewBox = styled(Box)`
  width: 50%;
  float: center;
  border: 0.5px dashed red;
  justify-content: center;
`
const TextBox = styled(Box)`
  /*width: 60%;*/
  float: center;
  border: 0.5px dashed red;
  max-height: 50vh;
`

const Photo = styled(Img)`
  float: right;
  width: 100%;
  height: 90vh;
  object-fit: contain;
  /*padding: rhythm(50),*/
`
const PhotoPreview = styled(Img)`
  width: 200px;
  height: 200px;
  object-fit: contain;
`
const Payment = styled(Flex)`
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  /*padding: rhythm(20);*/
`
const TagLink = styled(Link)`
  padding: 2px;
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
    imageA,
    imageB = null,
    fields: { tags = [] },
  } = data.etsy

  const tagList = tags
    .filter(t => !tagExclude.includes(t))
    .map((tag, index) => {
      tag =
        tag
          .replace(/_/g, ' ')
          .charAt(0)
          .toUpperCase() + tag.slice(1)
      return (
        <TagLink to={tag} key={index}>
          <Tag key={tag}> {tag} </Tag>
        </TagLink>
      )
    })
  return (
    <Layout>
      <Container>
        <Box width={[1, 1 / 2]} p={3} mb={10} float="right">
          <Photo
            title={`Photo by Eghan Thompson`}
            fluid={image.childImageSharp.fluid}
          />
        </Box>
        <Box width={[1, 2 / 5]} p={3} align-self="flex-start">
          <TextBox>
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
          </TextBox>
          <Flex>
            <PreviewBox align-self="flex-end" width={(1, 1 / 2)} p={4}>
              <PhotoPreview
                title={`Photo by Eghan Thompson`}
                fluid={imageA.childImageSharp.fluid}
              />
            </PreviewBox>
            <PreviewBox align-self="flex-end" width={(1, 1 / 2)} p={4}>
              {imageB == null ? (
                <Box />
              ) : (
                <PhotoPreview
                  title={`Photo by Eghan Thompson`}
                  fluid={imageB.childImageSharp.fluid}
                />
              )}
            </PreviewBox>
          </Flex>
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
          fluid(quality: 100, maxWidth: 700) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      imageA {
        childImageSharp {
          fluid(quality: 50) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      imageB {
        childImageSharp {
          fluid(quality: 50) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
      fields {
        tags
      }
    }
  }
`
