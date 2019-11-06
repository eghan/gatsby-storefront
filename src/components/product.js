import React from 'react'
import { navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import PaypalExpressBtn from 'react-paypal-express-checkout'

import { Consumer } from './context'
import Modal from './modal'
import Related from './related'
import { Categories, CategoriesMobile } from './categories'
import { TagFilter, Button } from '../utils/global'

const tagExclude = TagFilter

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0;
    height: auto;
  }
`
const Product = styled.div`
  border: 1px dimgray;
  grid-area: 1 / 2 / 1 / 2;
  width: 85vw;
  display: grid;
  @media (max-width: 750px) {
    width: 95vw;
    grid-area: 2/1/2/1;
  }
`
const LeftSide = styled.div`
  padding: 2em 1em;
  grid-area: 1 / 1 / 1 / 1;

  @media (max-width: 750px) {
    overflow: hidden;
    padding: 0 0 0.5em 0;
    border-bottom: 1px solid lightgray;
  }
`
const RightSide = styled.div`
  padding: 1em;
  grid-area: 1 / 2 / 1 / 2;
  @media (max-width: 750px) {
    grid-area: 2/1/2/1;
    padding: 0;
  }
`
const Info = styled.div`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  @media (max-width: 750px) {
    padding: 0;
  }
`

const TextDiv = styled.div`
  padding: 0 2em 0 0;
  grid-column: span 2;
  @media (max-width: 750px) {
    display: none;
  }
`

const Photo = styled(Img)`
  border: 1px solid dimgray;
  width: 35vw;
  padding: 2em 0;
  @media (max-width: 750px) {
    width: 90vw;
    padding: 0px;
    margin: auto;
  }
`
const Previews = styled.div`
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 750px) {
    position: relative;
    padding: 0;
  }
`
const PhotoPreview = styled(Img)`
  border: 1px solid dimgray;
  margin: auto;
  width: 90%;
  @media (max-width: 750px) {
  }
`
const RelatedTitle = styled.div`
  margin: 0 0.5em;
  padding: 0.2em 0;
  text-align: center;
  border-bottom: 1px solid gray;
  border-top: 1px solid gray;
  @media (max-width: 750px) {
    /*margin: 1em 0 0 0;*/
    margin: auto;
    padding: 0.5em 0 0 0;
  }
`

const PaymentDiv = styled.div`
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.3em 1em 0 0;
  text-align: center;
  @media (max-width: 750px) {
    width: 30vw;
    padding: 0.3em 2em 0 0;
  }
`
const Price = styled.div`
  font-size: 0.8em;
  padding: 0.5em;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  @media (max-width: 750px) {
    border: 0;
    padding: 0 0.5em 1em 0.5em;
  }
`
const TagDiv = styled.div`
  font-size: 0.8em;
  padding: 0.8em;
  text-align: center;
  @media (max-width: 750px) {
    padding: 0.3em;
  }
`
const CartButton = styled(Button)`
  font-size: 1.1em;
  @media (max-width: 750px) {
    font-size: 0.9;
  }
`
const PayLabel = styled.div`
  padding: 0.5em;
`

const ProductDisplay = props => {
  const location =
    typeof window !== `undefined` ? window.location.pathname : '/shop'

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
    id,
    name,
    description,
    price,
    image,
    fluid,
    imageA,
    fluidA,
    imageB,
    fluidB,
    tags: tags = [],
  } = props.product

  const tagList = tags
    .filter(t => !tagExclude.includes(t))
    .map((tag, index) => {
      let tagLowerCase = tag
      tag = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/_/g, ' ')
      return (
        <Button
          onClick={() => {
            navigate(tagLowerCase)
          }}
        >
          <div key={tag}> {tag} </div>
        </Button>
      )
    })

  return (
    <>
    <Container>
      <Categories />
      <Product>
        <LeftSide>
          <Modal source={fluid} location={location}>
            <Photo
              title={`Photo by Eghan Thompson`}
              fluid={fluid}
              id="mainImage"
              text={name}
            />
          </Modal>
        </LeftSide>
        <RightSide>
          <TextDiv>
            <div>{name}</div>
            <Info>{description}</Info>
          </TextDiv>
          <PaymentDiv>
            <TagDiv>
              Categories:
              <br />
              {tagList}
            </TagDiv>
            <Price>
              <PayLabel>with free shipping: {price} $</PayLabel>
              <Consumer>
                {({ data, set }) => {
                  return (
                    <div>
                      <CartButton
                        onClick={() => {
                          set({
                            itemList: [
                              ...data.itemList,
                              {
                                name,
                                price,
                                image: fluid,
                              },
                            ],
                          })
                          navigate('cart')
                        }}
                      >
                        add item to cart
                      </CartButton>
                    </div>
                  )
                }}
              </Consumer>
              <PayLabel>or, just get this one with Paypal</PayLabel>
              <PaypalExpressBtn
                client={client}
                currency={'USD'}
                total={Number(price)}
                style={style}
              />
            </Price>
          </PaymentDiv>
          <Previews>
            {imageA == null ? (
              <div />
            ) : (
              <Modal source={fluidA} location={location}>
                <PhotoPreview
                  title={`Photo by Eghan Thompson`}
                  fluid={fluidA}
                />
              </Modal>
            )}
            {imageB == null ? (
              <div />
            ) : (
              <Modal source={fluidB} location={location}>
                <PhotoPreview
                  title={`Photo by Eghan Thompson`}
                  fluid={fluidB}
                />
              </Modal>
            )}
          </Previews>
        </RightSide>
      </Product>
    </Container>
      <RelatedTitle>Related pieces:</RelatedTitle>
      <Related tags={tags.filter(t => !tagExclude.includes(t))} />
  </>
  )
}

export default ProductDisplay
