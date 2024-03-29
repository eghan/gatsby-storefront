require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
    // {  // causes tons and tons of problems, with z-indexing and with page scroll dissapearing??
    //   resolve: 'gatsby-plugin-transition-link',
    //   options: {
    //     layout: require.resolve(`./src/components/layout.js`),
    //   },
    // },
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    'gatsby-transformer-csv',
    {  
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-sharp',
    // {  //  this should be re-integrated post v2
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: 'gatsby-starter-default',
    //     short_name: 'starter',
    //     start_url: '/',
    //     background_color: '#663399',
    //     theme_color: '#663399',
    //     display: 'minimal-ui',
    //     //icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
    //   },
    // },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_KEY,
        tables: [
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Products`,
            tableView: `artofactory`,
            mapping: { photo: 'fileNode' },
          },
          {
            baseId: `appntJvRc0wlBRXVh`,
            tableName: `Data`,
            tableView: `gallery`,
            mapping: { photo: 'fileNode' },
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-plugin-prefetch-google-fonts`,
    //   options: {
    //     fonts: [
    //       {
    //         family: `Tinos`,
    //         subsets: [`latin`],
    //       },
    //       {
    //         family: `Open Sans`,
    //         variants: [`400`, `700`],
    //       },
    //     ],
    //   },
    // },
  ],
}
