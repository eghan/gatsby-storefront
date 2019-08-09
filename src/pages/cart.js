import React from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

import { Consumer } from '../components/context'


const CartDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 1vw;
    padding: 30px;
    border: 2px solid black;
    @media (max-width: 750px) {
        grid-template-columns: 1fr;
        height: 150vh;
        padding: 2vw;
    }
`

const cartBox = styled.div`
  border: 1px solid purple;
  display: inline-block;
  text-decoration: none;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin: 2%;
  text-align: bottom;
  grid-column: span 2;
  font-size: 0.85em;
  @media (max-width: 750px) {
    font-size: .6em;
    grid-column: span 3;
  }
`

const CartData = styled.div`
  display: block;
  width: 90vw;
  border: 2px dashed pink;
  @media (max-width: 750px) {
    grid-column: span 2;
    height: 50vw;
  }
`
const Photo = styled(Img)`
  width: 300px;
  height: 300px;

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


const ComponentThatChangeState = () => (
  <CartDiv>
    <Consumer>
      {({ data, set }) => (
        <>
        <cartBox>
          <button
            onClick={() =>
              set({
                itemList: [
                  ...data.itemList,
                  data.itemList[data.itemList.length - 1] + 1,
                ],
              })
            }
          >
            Add {'to ' + data.itemList}
          </button>
        </cartBox>
        </>
         )}
    </Consumer>
  </CartDiv>
)

const CartDisplay = () => (
  <>
    <Consumer>
      {({ data, set }) => (
        data.itemList.map( (item, index) => {
          return (
            <CartData>
              {item}
              <br />
          <button
            onClick={() => {
              data.itemList.splice(index, 1)
              set({
                itemList: [...data.itemList],
              })
            }
            }

          >
                remove item
              </button>
            </CartData>
          )
        })
      )
      }
    </Consumer>
  </>
)

const Cart = () => {
  return (
    <>
      <ComponentThatChangeState />
      <CartDisplay />
    </>
  )
}

export default Cart
