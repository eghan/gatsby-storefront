import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

const Body = styled.div`
  /*margin: auto;*/
  /*max-width: 90%;*/
  /*padding: 0 1.0875rem 1.24rem;*/
  /*border: 1px dashed silver;*/
  /*align-items: center;*/
  /*display: 'block';*/
`

const FooterNavigation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  padding: 2px 8px;
  position: fixed;
  width: 100vw;
  bottom: 0;  
/*  border-top: 1px solid black;*/  
  background: whiteSmoke;
  box-shadow: -5px -5px 20px WhiteSmoke;
  height: 66px;
  text-align: center;
`
const NavItem = styled.img`
  width: 38px;
`
const NavLink = styled(Link)`
  padding-top: 10px;
`

const Navigation = ({ data }) => {
  const Deck = data.allAirtable.edges
    .filter(i => i.node.data.name === 'nav')
    .map(i => {
      return i.node.data // array of objects
    })

  //   console.log('HI', Deck[0].details)
  //
  //   const Names = Deck.map( card => <div key={card.details}>{card.details}</div>)
  //
  //   console.log(Deck[0].photo.raw[0].url)

  return (
    <FooterNavigation>
      {Deck.map(card => (
        <NavLink to={card.details}>
          <NavItem key={card.details} src={card.photo.raw[0].url} />
        </NavLink>
      ))}
    </FooterNavigation>
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