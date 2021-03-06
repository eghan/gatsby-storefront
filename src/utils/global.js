import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import Img from 'gatsby-image'


const Mobile = styled.div`
  display: none;
  @media (max-width: 750px) {
    display: contents;
  }
`
const GridBox = styled.div`
  margin: 2% 10%;
`
const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  border-top: 2px solid black;
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
  }
`
const GridCell = styled.div`
  display: inline-block;
  margin: 3px;
  padding: 3px;
  text-align: center;
`
const Button = styled.button`
  font-size: 0.8em;
  border: 1px solid lightgray;
  background-color: white;
  margin: 5px;
  padding: 2px 20px;
  border-radius: 20px;
  outline: none;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset 0px 0px 3px 3px lightgray;
  }
`
const TagButton = styled(Button)`
  /*padding: 0.15em 0.4em;*/
  font-size: 0.9em;
`
const CustomsButton = styled(Button)`
  margin: 1em;
  border: 1px solid black;
  font-size: 0.9em;
  @media (max-width: 750px) {
    font-size: 0.6em;
    margin: 0 0.3em;
    display: inline;
  }
`

const Container = styled.div`
  display: grid;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`

const Products = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  padding: .7em;
  width: 84vw;
  @media (max-width: 750px) {
    width: 96vw;
    grid-area: 2/1/2/1;
    /*grid-column: span 2;*/
    padding: 0;
  }
`

const PhotoBox = styled.div`
  border-radius: 15px;
  /*border: 1px solid black;*/
  width: 15vw;
  height: 15vw;
  overflow: hidden;
  @media (max-width: 750px) {
    height: 45vw;
    width: 45vw;
  }
`
const Photo = styled(Img)`
  border-radius: 15px;
  /*height: 15vw;*/
  border: 1px solid black;
  @media (max-width: 750px) {
    height: 45vw;
  }
`

const CustomOrders = () => (
  <CustomsButton onClick={() => navigate('/contact')}>
    custom orders
  </CustomsButton>
)
const Inquiry = () => (
  <CustomsButton onClick={() => navigate('/contact')}>
    Inquiry
  </CustomsButton>
)
const Cart = () => (
  <CustomsButton onClick={() => navigate('/cart')}>cart</CustomsButton>
)

const TagFilter = [
  'industrial',
  'mechanical',
  'Bladerunner',
  'Mad_Max',
  'Firefly',
  'steampunk',
  'hypoallergenic',
  'niobium',
  'Niobium',
  'Jewelry',
  'firefly',
  'bladerunner',
  'jewelry',
  'venus',
  // 'Earrings',
]

export {
  GridBox,
  GridRow,
  GridCell,
  Button,
  TagButton,
  CustomsButton,
  CustomOrders,
  TagFilter,
  Cart,
  Mobile,
  Container,
  Products,
  Inquiry,
  Photo,
  PhotoBox,
}
