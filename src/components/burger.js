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
    "@media (minWidth:0px)": {
          background: 'orange'
    }
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '0px',
    width: '0px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    top: '20px',
    background: 'white',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)',
  },
}

const Nav = styled(Link)`
  margin: 0 auto;
  max-width: 960;
  padding: 0.3rem 0.4rem;
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
