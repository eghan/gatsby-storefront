require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const airtableKey = process.env.GATSBY_AIRTABLE_KEY ? process.env.GATSBY_AIRTABLE_KEY : GATSBY_AIRTABLE_KEY

module.exports = {
  siteMetadata: {
    title: 'Artofactory',
  },
  plugins: [
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: airtableKey,
        tables: [
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Products`,
            tableView: `artofactory`,
            mapping: { photo: 'fileNode' },
          },
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Designs`,
            tableView: `gallery`,
            mapping: { photo: 'fileNode' },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Tinos`,
            subsets: [`latin`],
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`],
          },
        ],
      },
    },
  ],
}
