import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const sections = ['gallery', 'shop', 'about', 'contact']

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: 0.15rem 0.35rem;
  display: inline;
  color: black;
  text-decoration: none;
  margin-bottom: 1.8em;
  font-size: 0.95em;
  &:hover {
    background-color: #f5f5f5;
  }
  -webkit-transition-duration: 0.8s; /* Safari */
  transition-duration: 0.8s;
  border-radius: 2px;
  vertical-align: bottom;
`
const Navbar = styled.div`
  margin: 0, auto;
  padding: 0.4em, 0.5em;
  border-bottom: 0.5px solid black;
`

const Header = ({ siteTitle }) => (
  <div style={{ borderBottom: '.5px solid black' }}>
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
      <div style={{ float: 'right', verticalAlign: 'bottom' }}>
        {sections.map(section => {
          return (
            <Nav key={section} to={section}>
              {section}
            </Nav>
          )
        })}
      </div>
    </Navbar>
  </div>
)

export default Header
