import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import Header from './header'
import Footer from './footer'

const Body = styled.div`
  /*margin: auto;*/
  /*max-width: 90%;*/
  /*padding: 0 1.0875rem 1.24rem;*/
  /*border: 1px dashed silver;*/
  /*align-items: center;*/
  /*display: 'block';*/

  /*background: #FFFDF7;*/
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sustainable upcycled handmade jewelry from machine parts' },
            { name: 'keywords', content: 'Sustainable, upcycled, handmade, jewelry, machine, parts, art, circlip, retaining ring, industrial, deco' },
          ]}
        >
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width" />
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title}/>
        <Body>        
          {children}
        </Body>
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
