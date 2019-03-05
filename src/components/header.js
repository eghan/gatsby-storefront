import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Burger from './burger.js'

const sections = ['gallery', 'shop', 'about', 'social']

const Links = styled(Link)`
  color: black;
  text-decoration: none;
`
const Nav = styled(Links)`
  padding: 0 0.8rem 0 0;
  font-size: 0.95em;
`
const Home = styled(Links)`
  grid-area: 1 / 1;
  padding: 0 0.8rem;
  font-size: 1.4em;
`
const Navbar = styled.div`
  /*background: #FFFDF7;  //why do I need this here, it should match body but it doesent'*/
  height: 2em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 0.5px solid black;
  @media (max-width: 750px) {
    height: 8vh;
  }
`
const Navitems = styled.div`
  grid-area: 1 / 2;
  text-align: right;
  padding: 0.3rem 0 0 0;
`


// because react-burger-menu does not support JSS visability control,
// render nav components based on screen size
class NavResponsive extends React.Component {
  render() {
    // verbose typeof check for jsPrettier :|
    let viewportWidth =
      (typeof window !== `undefined` && window.innerWidth) ||
      (typeof window !== `undefined` && document.documentElement.clientWidth)

    console.log(viewportWidth)
    if (viewportWidth > 640) {
      return (
        <Navitems>
          <Nav key="home" to="/">home</Nav>
          {sections.map(section => {
            return (
              <Nav key={section} to={section}>
                {section}
              </Nav>
            )
          })}
        </Navitems>
      )
    } else {
      return <Burger sections={sections} />
    }
  }
}

// const Layout = ({ children }) => (
//   <StaticQuery
//     query={graphql`
//       query SiteTitleQuery {
//         site {
//           siteMetadata {
//             title
//           }
//         }
//       }
//     `}
// 



const Header = ({ siteTitle }) => (
  <Navbar>
    <Home key={siteTitle} to={'/'}>{siteTitle}</Home>
    <NavResponsive />
  </Navbar>
)

export default Header
