import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'

import { rhythm } from '../utils/typography'
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  border: 3px dashed aqua;
`
const LeftSide = styled.div`
  padding: 20px;
  grid-column: span 2;
  grid-row: span 3;
  grid-gap: 10px;
  align-items: center;
  border: 5px dashed blue;
`
const Info = styled.div`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  /*margin: 1rem auto;*/
`
const Tag = styled.button`
  border: 0.5px dashed silver;
  font-size: 0.6em;
  text-decoration: none;
  &:hover {
    border: 0.5px solid black;
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.6s; /* Safari */
  transition-duration: 0.6s;
`
const Price = styled.div`
  font-size: 0.8em;
`

const PreviewDiv = styled.div`
  border: 10px dashed red;
  float: center;
  /*justify-content: center;*/
`
const TextDiv = styled.div`
  grid-column: span 2;
  border: 5px dashed red;
`

const Photo = styled(Img)`
  float: right;
  width: 100%;
  padding: 0.5rem 0.7rem;
`
const PhotoPreview = styled(Img)`
  width: 200px;
  height: 200px;
`
const PaymentDiv = styled.div`
  grid-column: 1fr;
  padding: 20px;
  grid-gap: 10px;
`
const TagDiv = styled.div`
  padding: 20px;
  grid-column: 1fr;
  grid-gap: 10px;
  float: center;
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

  const productImage = document.getElementById('mainImage')

  //productImage.fluid = imageA.childImageSharp.fluid

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
        <LeftSide>
          <Photo
            title={`Photo by Eghan Thompson`}
            fluid={image.childImageSharp.fluid}
            id="mainImage"
          />
        </LeftSide>
        <TextDiv>
          <div>{name}</div>
          <Info>{description}</Info>
        </TextDiv>
        <TagDiv>{tagList}</TagDiv>
        <PaymentDiv>
          <Price>{price} $</Price>
          <Price>free shipping</Price>
          <div>
            <PaypalExpressBtn
              client={client}
              currency={'USD'}
              total={Number(price)}
              style={style}
            />
          </div>
        </PaymentDiv>
        <PreviewDiv>
          <PhotoPreview
            title={`Photo by Eghan Thompson`}
            fluid={imageA.childImageSharp.fluid}
          />
        </PreviewDiv>
        <PreviewDiv>
          {imageB == null ? (
            <div />
          ) : (
            <PhotoPreview
              title={`Photo by Eghan Thompson`}
              fluid={imageB.childImageSharp.fluid}
            />
          )}
        </PreviewDiv>
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
