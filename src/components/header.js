import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

// migrate to static querry from Airtable
const sections = ['gallery', 'shop', 'about', 'social', 'cart']

const Links = styled(Link)`
  color: black;
  text-decoration: none;
`
const Nav = styled(Links)`
  margin: 0 0.8rem 0 0;
  font-size: 0.95em;
  transition-timing-function: ease-in;
  transition: 1.5s;

  &:hover {
    border-bottom: 2px solid rgba(192, 192, 192, 0);
  }
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

const TopNav = () => (
  <>
    <Navitems>
      <Nav key="home" to="/">
        home
      </Nav>
      {sections.map(section => {
        return (
          <Nav key={section} to={section}>
            {section}
          </Nav>
        )
      })}
    </Navitems>
  </>
)

const Header = ({ siteTitle }) => (
  <Navbar>
    <Home key={siteTitle} to={'/'}>
      {siteTitle}
    </Home>
    <TopNav />
  </Navbar>
)

export default Header
