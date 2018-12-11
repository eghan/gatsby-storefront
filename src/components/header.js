import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Burger from './burger.js'

const sections = ['gallery', 'shop', 'about', 'contact']

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: 0.3rem 0.8rem;
  display: inline-block;
  color: black;
  text-decoration: none;
  font-size: 0.95em;
  &:hover {
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.8s; /* Safari */
  transition-duration: 0.8s;
  border-radius: 2px;
  line-height: 0.5;
  vertical-align: sub;
`

const Navbar = styled.div`
  margin: 0, auto;
  padding: 0.4em, 0.5em;
  background-color: white;
`
const Navitems = styled.div`
  float: right;
  margin: 0, auto;
  padding: 0.4em, 0.5em;
`

const BurgerBar = styled(Burger)`
  display: block;
  @media screen and (min-width: 768px) {
    display: none;
  }
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

const Header = ({ siteTitle }) => (
  <div style={{ borderBottom: '.5px solid black', float: 'bottom' }}>
    <Navbar>
      <Link
        to="/"
        style={{
          color: 'black',
          textDecoration: 'none',
          padding: '1.8em',
          fontSize: '1.4em',
        }}
      >
        {siteTitle}
      </Link>
      <NavResponsive />
    </Navbar>
  </div>
)

export default Header
