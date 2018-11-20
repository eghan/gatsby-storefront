const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNode, createNodeField, createParentChildLink } = actions


  if (node.internal.type === `EtsyListingsDownloadCsv`) {
    let fileNode

    let nodeImages = []

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
        node.image___NODE = fileNode.TITLE
      }
    } catch (e) {
      console.log(e)
    }
  }
}

const path = require(`path`)
if (process.env.NODE_ENV === 'development') {
  process.env.GATSBY_WEBPACK_PUBLICPATH = '/'
}

var tagList = []
var etsyList = []

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
          //console.log(('test1', result.data.etsy.edges.node.name)
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
          // if (node.TAGS != null) {
          //   node.TAGS.split(',').forEach(tag => {
          //     if (!tagList.includes(tag)) {
          //       tagList = [...tagList, tag]
          //       createPage({
          //         path: tag,
          //         component: path.resolve(`./src/templates/tag-template.js`),
          //         context: {
          //           tag: tag,
          //         },
          //       })
          //     }
          //   })
          // }
        })
        return result
      })
      .then(result => {
        result.data.etsy.edges.forEach(({ node }) => console.log(node.name))
      })
    resolve()
  })
}
