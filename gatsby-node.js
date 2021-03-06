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
  const tagExclude = ['mad_max', 'steampunk']

  if (node.internal.type === `EtsyListingsDownloadCsv`) {
    let fileNode = {}
    let imageList = await [node.IMAGE1, node.IMAGE2, node.IMAGE3]

    await Promise.all(
      imageList.map(async (image, i) => {
        const fileNode = await createRemoteFileNode({
          url: image,
          parent: node,
          store,
          cache,
          createNode,
          createNodeId: id => `etsy-image${id}`,
        })

        if (!!fileNode) {
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
          // any tags that are on etsy but not wanted on site
          let tags = node.TAGS.split(',')
            .map(tag => tag.toLowerCase())
            .filter(tag => !tagExclude.includes(tag))

          createNodeField({
            node,
            name: 'tags',
            value: tags || [],
          })

          if (!!tags) {
            tags.forEach(tag => {
              if (!tagList.includes(tag)) {
                createPage({
                  path: tag,
                  component: path.resolve(`./src/templates/tag-template.js`),
                  context: {
                    tag: tag,
                    name: tag,
                  },
                })
                tagList = [...tagList, tag]
              }
            })
          }
        }
      })
    )
  }
  if (node.internal.type === `Airtable`) {
    if (!!node.data.tags) {
      let tagArray = Object.values(node.data.tags)
        .map(tag => tag.toLowerCase())
        .filter(tag => !tagList.includes(tag))
        .filter(tag => !tagExclude.includes(tag))
      tagArray.forEach(tag => {
        if (!tagList.includes(tag)) {
          createPage({
            path: tag,
            component: path.resolve(`./src/templates/tag-template.js`),
            context: {
              tag: tag,
              name: tag,
            },
          })
          tagList = [...tagList, tag]
        }
      })
    }
  }
}

const path = require(`path`)
if (process.env.NODE_ENV === 'development') {
  process.env.GATSBY_WEBPACK_PUBLICPATH = '/'
}

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  const {
    data: {
      allAirtable: { edges: airtableData },
    },
  } = await graphql(`
    query graphData {
      allAirtable {
        edges {
          node {
            data {
              name
              tags
              discription
              image: photo {
                localFiles {
                  name
                  id
                }
              }
            }
          }
        }
      }
    }
  `)
  const {
    data: {
      allEtsyListingsDownloadCsv: { edges: etsyData },
    },
  } = await graphql(`
    query etsyData {
      allEtsyListingsDownloadCsv {
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

  // serialize the data, [Object: null prototype] causes all 'smart' looping to fail
  // this issue is definately worth researching and posting to the primary github repo
  // data sources are being returned as unregistered objects

  let airtable = []
  airtableData.forEach(edge => {
    airtable = [...airtable, edge.node]
  })

  let etsy = []
  etsyData.forEach(edge => {
    etsy = [...etsy, edge.node]
  })

  airtable.forEach(node => {
    if (!!node.data.tags) {
      createPage({
        path: node.data.name,
        component: path.resolve(`./src/templates/airtable-page-template.js`),
        context: {
          name: node.data.name,
          discription: node.data.discription, // TODO: do i need this here?
          source: 'airtable',
          tags: [], // STUB, data from airtable needs to be formatted
        },
      })
    }

    // if (node.data.name == 'photoset') {
    //   node.data.photo.localFiles.forEach(img => {
    //     createPage({
    //       path: img.name,
    //       component: path.resolve(`./src/templates/airtable-photo-template.js`),
    //       context: {
    //         name: img.name,
    //       },
    //     })
    //   })
    // }

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
          // if (!tagList.includes(tag)) {
          //   tagList = [...tagList, tag]
          // }
        }
      })
    }
  })

  etsy.forEach(node => {
    if (node.discription !== null) {
      createPage({
        path: node.name,
        component: path.resolve(`./src/templates/etsy-page-template.js`),
        context: {
          name: node.name,
          discription: node.discription, // TODO: do i need this here?
          source: 'etsy',
          tags: [], // STUB, data from etsy needs to be formatted
        },
      })
    }
  })
}
