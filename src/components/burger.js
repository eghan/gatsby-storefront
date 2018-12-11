import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Menu from 'react-burger-menu/lib/menus/slide'

const sections = ['gallery', 'shop', 'about', 'contact']

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '10px',
    top: '10px',
  },
  bmBurgerBars: {
    background: 'black',
  },
  bmCross: {
    display: 'none',
  },
  bmMenu: {
    top: '80px',
    background: 'white',
    height: '180px',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: 'white',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
    float: 'center',
    padding: '0.3rem 0.4rem',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)',
  },
}

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: 2.5rem 2.5rem;
  display: inline-block;
  color: black;
  text-decoration: none;
  font-size: 1.5em;
`

class Burger extends React.Component {
  render() {
    return (
      <Menu right styles={styles}>
        {sections.map(section => {
          return (
            <Nav key={section} to={section}>
              {section}
            </Nav>
          )
        })}
      </Menu>
    )
  }
}

export default Burger
