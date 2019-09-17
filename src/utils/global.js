import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'



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
`

const CustomOrders = () => <CustomsButton onClick={() => navigate('/contact')}> custom orders </CustomsButton>

const TagFilter = [
  'industrial',
  'mechanical',
  'Bladerunner',
  'Mad_Max',
  'Firefly',
  'steampunk',
  'hypoallergenic',
  'niobium',
  'Jewelry',
  'firefly',
  'bladerunner',
  'jewelry',
  // 'Earrings',
]

export { GridBox, GridRow, GridCell, Button, TagButton, CustomOrders, TagFilter }