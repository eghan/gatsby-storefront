import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import styled from 'styled-components'

const FootPlacement = styled.div`
  position: absolute;
  bottom: 0;
`
const FooterNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 2px 8px;
  position: fixed;
  width: 100vw;
  bottom: 0;
  background: whiteSmoke;
  box-shadow: -5px -5px 20px WhiteSmoke;
  height: 66px;
  text-align: center;
  z-index: 1000;
`
const NavItem = styled.img`
  width: 40px;
  @media (max-width: 750) {
    width: 10vw;
  }
`
const NavLink = styled(Link)`
  padding-top: 10px;
`

const Navigation = ({ data }) => {
  const Deck = data.allAirtable.edges
    .filter(i => i.node.data.name === 'nav')
    .sort((a, b) => a.node.data.priority - b.node.data.priority)
    .map(i => i.node.data)

  return (
    <FootPlacement>
      <FooterNavigation>
        {Deck.map(card => (
          <NavLink to={card.details}>
            <NavItem key={card.details} src={card.photo.raw[0].url} />
          </NavLink>
        ))}
      </FooterNavigation>
    </FootPlacement>
  )
}

const MobileNavigation = ({ children }) => (
  <StaticQuery
    query={graphql`
      query MobileNavigation {
        allAirtable {
          edges {
            node {
              data {
                id
                name
                section
                priority
                discription
                details
                photo {
                  id
                  raw {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Navigation data={data}>{children}</Navigation>}
  />
)

export default MobileNavigation
