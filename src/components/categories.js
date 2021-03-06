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
  grid-row: span 2;
  @media (max-width: 750px) {
    grid-area: 1/1/1/1;
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
  text-align: center;
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
const TagCounts = styled.span`
  font-size: 0.6em;
  padding: 0 0 0 0.8em;
  letter-spacing: 0.1em;
`

const CategoriesMobile = () => <></>

const Categories = props => {
  const DeSlug = text =>
    text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ')
  const FilteredSortedTags = useSiteTags()
    .filter(tag => tag[0] > 1)
    .sort((a, b) => {
      return b[0] - a[0]
    })

  return (
    <Nav>
      {/* <TagMenu categories={tagsFiltered}> */}
      {/*   <ButtonMobileLeft>search by tag</ButtonMobileLeft> */}
      {/* </TagMenu> */}
      {/* <ButtonMobileRight onClick={() => navigate('/contact')}> */}
      {/*   custom orders */}
      {/* </ButtonMobileRight> */}
      <Section>
        <Tags>{'\u291F'} Tags {'\u2920'}</Tags>
        {FilteredSortedTags
          .map(tag => (
            <TagButton
              onClick={() => {
                navigate(tag[1])
              }}
            >
              {DeSlug(tag[1])}
              <TagCounts>({tag[0]})</TagCounts>
            </TagButton>
          ))}
      </Section>
      <Section>
        <CustomOrders />
        <Cart />
      </Section>
      <Mobile>
        <MenuModal categories={FilteredSortedTags}>tags</MenuModal>
        <CustomOrders />
        <Cart />
      </Mobile>
    </Nav>
  )
}

export { Categories, CategoriesMobile }
