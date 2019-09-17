import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'

// import Tagbar from './tagbar'
import { Button, TagButton, CustomOrders } from '../utils/global'
import { useSiteTags } from '../hooks/tags'
// import MenuModal from './menu-modal'

const Box = styled.div`
  padding: 0.7em;
  display: grid;

  @media (max-width: 750px) {
    padding: 0.3em;
    width: 90vw;
  }
`
const ButtonMobileLeft = styled(Button)`
  display: none;
  @media (max-width: 750px) {
    display: inline;
    font-size: 0.7em;
  }
`
const ButtonMobileRight = styled(Button)`
  display: none;
  @media (max-width: 750px) {
    display: inline;
    font-size: 0.7em;
    float: right;
  }
`
const Tags = styled.div`
  margin: 0 0 0.5em 0;
  border-bottom: 1px solid lightgray;
`
const SideBar = styled.div`
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
    <Box>
      {/* <TagMenu categories={tagsFiltered}> */}
      {/*   <ButtonMobileLeft>search by tag</ButtonMobileLeft> */}
      {/* </TagMenu> */}
      {/* <ButtonMobileRight onClick={() => navigate('/contact')}> */}
      {/*   custom orders */}
      {/* </ButtonMobileRight> */}
      <SideBar>
        <Tags>Tags:</Tags>
        {/* {JSON.stringify(useSiteTags())} */}
        {useSiteTags().map(tag => (
          <TagButton
            onClick={() => {
              navigate(tag[1])
            }}
          >
            {/* {tag[1]} has {tag[0]} */}
            {DeSlug(tag[1])}
            {/* {tag[0]} */}
          </TagButton>
        ))}
      </SideBar>
      <CustomOrders />
    </Box>
  )
}

export { Categories, CategoriesMobile }
