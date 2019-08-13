import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from '../components/modal'
import PaypalExpressBtn from 'react-paypal-express-checkout'

import { Consumer } from '../components/context'
import { GridBox, GridCell, GridRow, Button } from '../utils/global'

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
  size: 'medium', // small | medium | large | responsive
  shape: 'rect', // pill | rect
  color: 'blue', // gold | blue | silver | black
}

const CartDisplay = () => (
  <GridBox>
    <Consumer>
      {({ data, set }) => {
        if ([...data.itemList].length < 2) {
          return <div>cart empty</div>
        }
        const cartItems = data.itemList.filter(item => item !== 0)
        const cartTotal = cartItems.reduce(
          (prev, cur) => prev + Number.parseInt(cur.price),
          0
        )
        const cartDisplayTotal = (
          <GridRow>
            <GridCell />
            <GridCell />
            <GridCell>with free shipping</GridCell>
            <GridCell>Total: {cartTotal}</GridCell>
            <GridCell />
            <GridCell />
            <GridCell>Checkout with Paypal => </GridCell>
            <GridCell>
              <PaypalExpressBtn
                client={client}
                currency={'USD'}
                total={Number(cartTotal)}
                style={style}
              />
            </GridCell>
          </GridRow>
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
                <GridCell>
                  <div>{item.name}</div>
                  <Button
                    onClick={() => {
                      navigate(item.name)
                    }}
                  >
                    go to item listing
                  </Button>
                </GridCell>
                <GridCell>
                  <Button
                    onClick={() => {
                      set({
                        itemList: [...data.itemList, item],
                      })
                    }}
                  >
                    add another of this
                  </Button>
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
                </GridCell>
                <GridCell>{item.price}</GridCell>
              </GridRow>
            )
          }
        })

        return [cartDisplay, cartDisplayTotal]
      }}
    </Consumer>
  </GridBox>
)

const Cart = () => {
  return (
    <>
      <CartDisplay />
    </>
  )
}

export default Cart
