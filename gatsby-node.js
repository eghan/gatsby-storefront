const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// shared across createPage and onCreateNode to unify tags between etsy and airtable
var tagList = []

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const {
    createNode,
    createNodeField,
    createParentChildLink,
    createPage,
  } = actions

  if (node.internal.type === `EtsyListingsDownloadCsv`) {
    let fileNode

    try {
      fileNode = await createRemoteFileNode({
        url: node.IMAGE1,
        parent: node,
        store,
        cache,
        createNode,
        createNodeId: id => `etsy-image${id}`,
      })
      if (fileNode) {
        node.image___NODE = fileNode.id
      }

      if (node.TAGS !== null) {
        let tags = node.TAGS.split(',')

        // TODO: re-examine use of variable tagList, global vs local

        createNodeField({
          node,
          name: 'tags',
          value: tags,
        })

        tags.forEach(tag => {
          if (!tagList.includes(tag)) {
            createPage({
              path: tag,
              component: path.resolve(`./src/templates/tag-template.js`),
              context: {
                tag: tag,
              },
            })
            tagList = [...tagList, tag]
          }
        })
      }
    } catch (e) {
      //console.log(e)
    }
  }
}

const path = require(`path`)
if (process.env.NODE_ENV === 'development') {
  process.env.GATSBY_WEBPACK_PUBLICPATH = '/'
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      query productData {
        allAirtable {
          edges {
            node {
              data {
                name
                tags
                discription
                photo {
                  localFiles {
                    name
                    id
                  }
                }
              }
            }
          }
        }
        etsy: allEtsyListingsDownloadCsv {
          edges {
            node {
              name: TITLE
              discription: DESCRIPTION
              TAGS
            }
          }
        }
      }
    `)
      .then(result => {
        result.data.allAirtable.edges.forEach(({ node }) => {
          if (node.data.discription !== null) {
            createPage({
              path: node.data.name,
              component: path.resolve(
                `./src/templates/airtable-page-template.js`
              ),
              context: {
                name: node.data.name,
                discription: node.data.discription, // TODO: do i need this here?
                source: 'airtable',
              },
            })
          }
          if (node.data.name == 'photoset') {
            node.data.photo.localFiles.forEach( img => {
              createPage({
                path: img.name,
                component: path.resolve(
                  `./src/templates/airtable-photo-template.js`
                ),
                  context: {
                    name: img.name,
                  },
              })
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
        })
        return result
      })
      .then(result => {
        result.data.etsy.edges.forEach(({ node }) => {
          if (node.discription !== null) {
            createPage({
              path: node.name,
              component: path.resolve(`./src/templates/etsy-page-template.js`),
              context: {
                name: node.name,
                discription: node.discription, // TODO: do i need this here?
                source: 'etsy',
              },
            })
          }
        })
        return result
      })
      .then(result => {
        //result.data.etsy.edges.forEach(({ node }) => console.log(node.name))
      })
    resolve()
  })
}
