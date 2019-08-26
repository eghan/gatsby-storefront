import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from '../components/modal'
import PaypalExpressBtn from 'react-paypal-express-checkout'

import { Consumer } from '../components/context'
import { GridBox, GridCell, GridRow, Button } from '../utils/global'

const CartCell = styled(GridCell)`
  padding: 0.5em 0 0 0;
  @media (max-width: 750px) {
    font-size: 0.6em;
  }
`
const CartBox = styled(GridBox)`
  @media (max-width: 750) {
    margin: 0 0 10em 0;
  }
`

const Photo = styled(Img)`
  height: 150px;

  // method to access picture properties directly
  picture {
    overflow: hidden;
    width: 100px;
  }

  @media (max-width: 1040px) {
    padding: 0em 0em;
    width: 150px;
    height: 150px;
  }
`
const location =
  typeof window !== `undefined` ? window.location.pathname : '/cart'

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
  color: 'blue', // gold | blue | silver | black
}

const CartDisplay = () => (
  <CartBox>
    <Consumer>
      {({ data, set }) => {
        if ([...data.itemList].length < 2) {
          return (
            <div>
              cart empty, check out things for sale in the
              <Button
                onClick={() => {
                  navigate('shop')
                }}
              >
                Shop
              </Button>
            </div>
          )
        }
        const cartItems = data.itemList.filter(item => item !== 0)
        const cartTotal = cartItems.reduce(
          (prev, cur) => prev + Number.parseInt(cur.price),
          0
        )
        const cartDisplayTotal = (
          <>
            <GridRow>
              <CartCell />
              <CartCell />
              <CartCell>with free shipping</CartCell>
              <CartCell>Total: {cartTotal} $</CartCell>
              <CartCell />
              <CartCell />
              <CartCell>Checkout with {'\u2192'} </CartCell>
              <CartCell>
                <PaypalExpressBtn
                  client={client}
                  currency={'USD'}
                  total={Number(cartTotal)}
                  style={style}
                />
              </CartCell>
            </GridRow>
            <GridRow>
              <br />
              <br />
            </GridRow>
          </>
        )

        const cartDisplay = cartItems.map((item, index) => {
          if (item.hasOwnProperty('name')) {
            return (
              <GridRow>
                <GridCell>
                  <Modal source={item.image} location={location}>
                    <Photo
                      title={`Photo by Eghan Thompson`}
                      fluid={item.image}
                      id="mainImage"
                    />
                  </Modal>
                </GridCell>
                <CartCell>
                  <div>{item.name}</div>
                  <Button
                    onClick={() => {
                      navigate(item.name)
                    }}
                  >
                    go to item listing
                  </Button>
                </CartCell>
                <CartCell>
                  <Button
                    onClick={() => {
                      set({
                        itemList: [...data.itemList, item],
                      })
                    }}
                  >
                    add another of this
                  </Button>
                  <br />
                  or
                  <Button
                    onClick={() => {
                      data.itemList.splice(index + 1, 1)
                      set({
                        itemList: [...data.itemList],
                      })
                    }}
                  >
                    remove item
                  </Button>
                </CartCell>
                <CartCell>{item.price}$</CartCell>
              </GridRow>
            )
          }
        })

        return [cartDisplay, cartDisplayTotal]
      }}
    </Consumer>
  </CartBox>
)

const Cart = () => {
  return (
    <>
      <CartDisplay />
    </>
  )
}

export default Cart
