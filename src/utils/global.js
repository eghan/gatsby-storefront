import styled from 'styled-components'


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
  border: 1.4px solid dimgray;
  background-color: white;
  margin: 5px;
  padding: 2px 20px;
  border-radius: 20px;
  outline: none;
  transition: all 0.3s;
  &:hover {
    box-shadow: inset -1px 0px 3px 3px lightgray;
  }
`

export { GridBox, GridRow, GridCell, Button  }