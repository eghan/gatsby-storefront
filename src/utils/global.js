import styled from 'styled-components'


const GridBox = styled.div`
  margin: 2%;
`
const GridRow = styled.div`
  display: grid;  
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  border-top: 2px solid black;
`
const GridCell = styled.div`
  display: inline-block;
  margin: 3px;
  padding: 3px;
  text-align: center;
`

export { GridBox, GridRow, GridCell  }