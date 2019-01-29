import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

const Photo = styled(Img)`
  margin: 0 auto;
`
const Box = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1vw;
  padding: 1vw;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`


const Teaser = ({ data }) => (
    <Box>
    </Box>
)

export default Teaser
