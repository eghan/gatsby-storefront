import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styled from 'styled-components'
import Modal from 'react-modal'
import { Location } from '@reach/router'

import PhotoModal from '../components/modal'
import PaypalExpressBtn from 'react-paypal-express-checkout'

Modal.setAppElement('body')

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
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5em;
  height: 94vh;
  object-fit: contain;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0em 0em;
  }
  /*border: 3px dashed aqua;*/
`
const LeftSide = styled.div`
  grid-row: span 5;
  /*border: 5px dashed blue;*/
`
const RightSide = styled.div`
  display: grid;
  grid-row: span 5;
  /*border: 5px dashed blue;*/
`
const Info = styled.div`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  /*margin: 1rem auto;*/
`
const Tag = styled.button`
  border: 0.5px solid gray;
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
  padding: 0 0.5em 0 0.5em;
`

const PreviewDiv = styled.div`
  grid-column: span 2;
  align-self: end;
  /*border: 10px dashed red;*/
`
const TextDiv = styled.div`
  padding: 1em 2em 0 0;
  grid-column: span 2;
  @media (max-width: 750px) {
    padding: 0 0 0 0.5em;
    width: 95vw;
  }
  /*border: 5px dashed green;*/
`

const Photo = styled(Img)`
  height: 94vh;
  @media (max-width: 750px) {
    width: 100vw;
    height: auto;
    float: left;
  }
`
const PhotoPreview = styled(Img)`
  display: inline-block;
  margin: 0.3em;
  width: 200px;
  height: 200px;
  @media (max-width: 750px) {
    width: 100vw;
    height: auto;
  }
`
const PaymentDiv = styled.div`
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.3em 1em 0 0;
  text-align: right;
  @media (max-width: 750px) {
    width: 50vw;
    padding: 0 0 0 0;
  }
  /*border: 10px dashed indigo;*/
`
const TagDiv = styled.div`
  padding: 0.8em;
  text-align: center;
  @media (max-width: 750px) {
    padding: 0;
    width: 50vw;
  }
`
const TagLink = styled(Link)`
  padding: 0.3em;
  @media (max-width: 750px) {
    padding: 0.1em;
    font-size: 0.9em;
  }
`
const PaypalScreen = styled.button`
  border: 0.8px solid black;
  font-size: 1em;
  text-decoration: none;
  &:hover {
    border: 0.5px solid black;
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.6s; /* Safari */
  transition-duration: 0.6s;
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
    shape: 'pill', // pill | rect
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

  //  -- document refrences in gatsby must be wrapped for SSR --
  //const productImage = document.getElementById('mainImage')

  //   const IndexPage = (props) => (
  //   <Layout>
  //     <p>This works {props.location.pathname}</p>
  //   </Layout>
  // )

  const location =
    typeof window !== `undefined` ? window.location.pathname : '/shop'

  const tagList = tags
    .filter(t => !tagExclude.includes(t))
    .map((tag, index) => {
      let tagLowerCase = tag
      tag =
        tag
          .replace(/_/g, ' ')
          .charAt(0)
          .toUpperCase() + tag.slice(1)
      return (
        <TagLink to={tagLowerCase} key={index}>
          <Tag key={tag}> {tag} </Tag>
        </TagLink>
      )
    })

  return (
    <Layout>
      <Container>
        <LeftSide>
          <PhotoModal
            source={image.childImageSharp.fluid}
            location={location}
          >
            <Photo
              title={`Photo by Eghan Thompson`}
              fluid={image.childImageSharp.fluid}
              id="mainImage"
            />
          </PhotoModal>
        </LeftSide>
        <RightSide>
          <TextDiv>
            <div>{name}</div>
            <Info>{description}</Info>
          </TextDiv>
          <PaymentDiv>
            <TagDiv>{tagList}</TagDiv>
            <Price>
              free shipping
              <br />
              {price} $
              <br />
                <PaypalExpressBtn
                  client={client}
                  currency={'USD'}
                  total={Number(price)}
                  style={style}
                />
            </Price>
          </PaymentDiv>
          <PreviewDiv>
            <PhotoModal
              source={imageA.childImageSharp.fluid}
              location={location}
            >
              <PhotoPreview
                title={`Photo by Eghan Thompson`}
                fluid={imageA.childImageSharp.fluid}
              />
            </PhotoModal>

            {imageB == null ? (
              <div />
            ) : (
              <PhotoModal
                source={imageB.childImageSharp.fluid}
                location={location}
              >
                <PhotoPreview
                  title={`Photo by Eghan Thompson`}
                  fluid={imageB.childImageSharp.fluid}
                />
              </PhotoModal>
            )}
          </PreviewDiv>
        </RightSide>
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
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      imageB {
        childImageSharp {
          fluid(quality: 80) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      fields {
        tags
      }
    }
  }
`
