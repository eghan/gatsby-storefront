import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from '../components/modal'

import { Consumer } from '../components/context'
import { GridBox, GridCell, GridRow } from '../utils/global'

const ActionButton = styled.button`
  border: 1px solid black;
  background-color: white;
  margin: 5px;
  padding: 2px 20px;
  border-radius: 20px;
  outline: none;
`

const Photo = styled(Img)`
  height: 200px;

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

const CartDisplay = () => (
  <GridBox>
    <Consumer>
      {({ data, set }) =>
        data.itemList
          .filter(item => item !== 0)
          .map((item, index) => {
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
                    {item.name}
                    <ActionButton
                      onClick={() => {navigate(item.name)}}
                    >
                      go to item listing
                    </ActionButton>
                  </GridCell>
                  <GridCell>
                    <ActionButton
                      onClick={() => {
                        set({
                          itemList: [...data.itemList, item],
                        })
                      }}
                    >
                      add another of this
                    </ActionButton>
                    or
                    <ActionButton
                      onClick={() => {
                        data.itemList.splice((index+1), 1)
                        set({
                          itemList: [...data.itemList],
                        })
                      }}
                    >
                      remove item
                    </ActionButton>
                  </GridCell>
                  <GridCell>{item.price}</GridCell>
                </GridRow>
              )
            }
          })
      }
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
