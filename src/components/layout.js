import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import 'typeface-tinos'
import Transition from './transitions'

import { ContextProviderComponent } from './context'
import Header from './header'
import Footer from './footer'

const Body = styled.div``

const Layout = ({ children, location }) => (
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
    render={node => (
      <>
        <ContextProviderComponent>
          <Helmet
            title={node.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content:
                  'Sustainable upcycled handmade jewelry from machine parts',
              },
              {
                name: 'keywords',
                content:
                  'Sustainable, upcycled, handmade, jewelry, machine, parts, art, circlip, retaining ring, industrial, deco',
              },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <Header siteTitle={node.site.siteMetadata.title} />
          <Body>

            {/* {children} */}
            
            <Transition location={location}>
              {children}
            </Transition>
          
          </Body>
          <Footer />
        </ContextProviderComponent>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
