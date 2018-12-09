import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Burger from './burger.js'

const sections = ['gallery', 'shop', 'about', 'contact']

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: .3rem .8rem;
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
  line-height: .5;
  vertical-align: sub;
`

const Navbar = styled.div`
  margin: 0, auto;
  padding: 0.4em, 0.5em;
`
const Navitems = styled.div`
  float: right;
  margin: 0, auto;
  padding: 0.4em, 0.5em;
`

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
      <Navitems>      
        {sections.map(section => {
          return (
            <Nav key={section} to={section}>
              {section}
            </Nav>
          )
        })}
        <Burger sections={sections} />
      </Navitems>

    </Navbar>
  </div>
)

export default Header
