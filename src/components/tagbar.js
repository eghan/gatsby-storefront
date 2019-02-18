import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Menu from 'react-burger-menu/lib/menus/slide'
import tagIcon from "../images/more-horizontal.svg"

const tagExclude = [
  'industrial',
  'mechanical',
  'Bladerunner',
  'Mad_Max',
  'Firefly',
  'hypoallergenic',
  'niobium',
  'Jewelry',
  'Earrings',
  'steampunk',
  'Metal',
]
const Content = styled.div`
  text-overflow: ellipsis;

  /* Required for text-overflow to do anything */
  white-space: nowrap;
  overflow: hidden;
  /*border: 0.5px dashed silver;*/
  display: block;
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  background: 'white';
  text-decoration: none;
  /*border-bottom: 0.1px solid silver;*/
`

const Tag = styled.div`
  display: inline-block;
  color: black;
  border: 0.5px dashed white;
  font-size: 0.7em;
  text-decoration: none;
  padding: 0.25em;
  &:focus {
    outline: 0;
  }
  &:hover {
    border: 0.5px solid black;
    /*background-color: #f5f5f5;*/
  }
  -webkit-transition-duration: 0.6s; /* Safari */
  transition-duration: 0.6s;  
  @media (max-width: 750px) {
    font-size: 0.5em;
  }
`
const TagLink = styled(Link)`
  text-decoration: none;
`
const TagTitle = styled(Link)`
  display: inline-block;
  font-size: 1.1em;
  color: black;
  text-decoration: none;
`

var styles = {
  bmBurgerButton: {
    position: 'fixed',
    // border: '5px solid white',
    borderRadius: '4px',
    width: '30px',
    height: '22px',
    right: '10px',
    top: '2.5em',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    // backgroundColor: 'white',
  },
  bmBurgerBars: {
    background: 'black',
  },
  bmCross: {
    display: 'none',
  },
  bmMenu: {
    textAlign: 'center',
    top: '80px',
    background: 'white',
    height: '90vh',
    width: '300px',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: 'white',
    padding: '0.8em',
    fontSize: '.5em',
  },
  bmItem: {
    display: 'block',
    float: 'center',
    padding: '0.3rem 0.4rem',
    align: 'center',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)',
  },
}

const Nav = styled(Link)`
  margin: 0 auto;
  padding: .5rem .5rem;
  display: inline;
  color: black;
  text-decoration: none;
  font-size: 1.5em;
`

// class Burger extends React.Component {
//   render() {
//     return (
//       <Menu right styles={styles}>
//         {sections.map(section => {
//           return (
//             <Nav key={section} to={section}>
//               {section}
//             </Nav>
//           )
//         })}
//       </Menu>
//     )
//   }
// }

var burgerTags = []

const Tagbar = props => (
  <StaticQuery
    // variables={this.props.pageContext.name}
    query={graphql`
      query tagbar {
        sitePage(context: { name: { eq: "Tags" } }) {
          context {
            name
            discription
            Tags
          }
        }
      }
    `}
    render={data => {
      //console.log(data.sitePage.context.Tags)
      // burgerTags = data.sitePage.context.Tags
      //console.log(sections)
      const tagList = data.sitePage.context.Tags.filter(
        t => !tagExclude.includes(t)
      ).map((tag, index) => {
        let link = tag
        let cleanTag =
          tag
            .charAt(0)
            .toUpperCase() + tag.slice(1)
            .replace(/_/g, ' ')
        
        if ( !burgerTags.includes(cleanTag) ) {
          burgerTags = [...burgerTags, cleanTag]
        }

        return (
          <TagLink to={link} key={index}>
            <Tag key={cleanTag}>{cleanTag}</Tag>
            &#903;
          </TagLink>
        )
      })
      console.log(burgerTags)

      return (
        <Content>
          <Tag to="Tags" key="Tags">
            <TagTitle  to="Tags">Elements :</TagTitle>
          </Tag>
          {tagList}
          <Menu right styles={styles} customBurgerIcon={ <img src={tagIcon} /> }>
            {burgerTags.map(element => {
              return (
                <Nav key={element} to={element}>
                  &#903;{element}
                </Nav>
              )
            })}
          </Menu>
          {/* <Burger tags={sections} customBurgerIcon={ <Img src="../images/burger_icon.svg" /> } /> */}
        </Content>
      )
    }}
  />
)

export default Tagbar
