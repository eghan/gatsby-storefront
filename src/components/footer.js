import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import MobileNavigation from './mobilenav'

const Links = styled(Link)`
  color: black;
  text-decoration: none;
`
const FootBox = styled.div`
  height: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 0.5px solid black;
  @media (max-width: 750px) {
    height: 8vh;
  }
`

// because react-burger-menu does not support JSS visability control,
// render nav components based on screen size
class Footer extends React.Component {
  render() {
    // verbose typeof check for jsPrettier :|
    let viewportWidth =
      (typeof window !== `undefined` && window.innerWidth) ||
      (typeof window !== `undefined` && document.documentElement.clientWidth)

    console.log(viewportWidth)
    if (viewportWidth > 640) {
      return (
        <FootBox>
          footer
        </FootBox>
      )
    } else {
      return <MobileNavigation />
    }
  }
}


export default Footer
