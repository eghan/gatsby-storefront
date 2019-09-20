import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

// import Tagbar from './tagbar'
import { Button, TagButton, CustomOrders, Cart, Mobile } from '../utils/global'
import { useSiteTags } from '../hooks/tags'
import MenuModal from './menu-modal'

const Nav = styled.div`
  padding: 0.7em;
  display: inline;
  width: 15vw;
  border-right: 1px solid dimgray;
  @media (max-width: 750px) {
    text-align: center;
    width: auto;
    border-right: none;
    border-bottom: 1px solid dimgray;
    padding: 0.2em 0 0.4em 0;
    width: 95vw;
    margin: 0 0 0.3em 0;
  }
`

const Tags = styled.div`
  margin: 0 0 0.5em 0;
  border-bottom: 1px solid lightgray;
`
const Section = styled.div`
  /*display: inline;*/
  /*background: gold;*/
  padding: 0 0 1em 0;
  border-bottom: 1px solid lightgray;
  @media (max-width: 750px) {
    display: none;
    width: 0em;
  }
`

const CategoriesMobile = () => <div>hihi</div>

const Categories = props => {
  const DeSlug = text =>
    text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ')

  return (
    <Nav>
      {/* <TagMenu categories={tagsFiltered}> */}
      {/*   <ButtonMobileLeft>search by tag</ButtonMobileLeft> */}
      {/* </TagMenu> */}
      {/* <ButtonMobileRight onClick={() => navigate('/contact')}> */}
      {/*   custom orders */}
      {/* </ButtonMobileRight> */}
      <Section>
        <Tags>Tags:</Tags>
        {useSiteTags().map(tag => (
          <TagButton
            onClick={() => {
              navigate(tag[1])
            }}
          >
            {DeSlug(tag[1])}
          </TagButton>
        ))}
      </Section>
      <Section>
        <CustomOrders />
        <Cart />
      </Section>
      <Mobile>
        <MenuModal categories={useSiteTags()}>tags</MenuModal>
        <CustomOrders />
        <Cart />
      </Mobile>
    </Nav>
  )
}

export { Categories, CategoriesMobile }
