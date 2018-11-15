const path = require(`path`)
if (process.env.NODE_ENV === 'development') {
  process.env.GATSBY_WEBPACK_PUBLICPATH = '/'
}

var tagList = []

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allAirtable {
          edges {
            node {
              data {
                name
                tags
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allAirtable.edges.forEach(({ node }) => {
        if (node.data.discription !== null) {
          createPage({
            path: node.data.name,
            component: path.resolve(`./src/templates/page-template.js`),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              name: node.data.name,
              discription: node.data.discription,
            },
          })
        }
        if (node.data.tags != null) {
          node.data.tags.forEach(tag => {
            if (!tagList.includes(tag)) {
              tagList = [...tagList, tag]
              createPage({
                path: tag,
                component: path.resolve(`./src/templates/tag-template.js`),
                context: {
                  tag: tag,
                },
              })
            }
          })
        }

        console.log(tagList)
        resolve()
      })
    })
  })
}
