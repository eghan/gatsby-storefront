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
    let imageList = await [node.IMAGE1, node.IMAGE2, node.IMAGE3]

    await Promise.all(
      imageList.map(async (image, i) => {
        // try {
        fileNode = await createRemoteFileNode({
          url: image,
          parent: node,
          store,
          cache,
          createNode,
          createNodeId: id => `etsy-image${id}`,
        })

        if (fileNode) {
          // let imageId = ('image' + i + '___NODE') doesn't work, Gatsby uses ___NODE as a hook
          // gotta be a better way to do this -->  ...but it works
          if (i === 0) {
            node.image___NODE = fileNode.id
          }
          if (i === 1) {
            node.imageA___NODE = fileNode.id
          }
          if (i === 2) {
            node.imageB___NODE = fileNode.id
          }
        }

        if (node.TAGS !== null) {
          let tags = node.TAGS.split(',')

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
          // }
        }
        // catch (e) {
        //console.log(e)
        // }
      })
    )
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
            node.data.photo.localFiles.forEach(img => {
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
        createPage({
          path: `Tags`,
          component: path.resolve(`./src/templates/tag-list-template.js`),
          context: {
            name: `Tags`,
            discription: `all the Tags`, // TODO: do i need this here?
            source: 'gatsbyNode',
            Tags: tagList,
          },
        })
        //result.data.etsy.edges.forEach(({ node }) => console.log(node.name))
      })
    resolve()
  })
}
