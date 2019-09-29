import { useStaticQuery, graphql } from 'gatsby'

import { TagFilter } from '../utils/global'

export const useSiteTags = () => {
  const data = useStaticQuery(
    graphql`
      query Tags {
        etsy: allEtsyListingsDownloadCsv {
          edges {
            node {
              id
              name: TITLE
              fields {
                tags
              }
            }
          }
        }
        airtable: allAirtable {
          edges {
            node {
              data {
                tags
              }
            }
          }
        }
      }
    `
  )

  // const { edges } = data.etsy
  // console.log('test 1', edges)

  let orderedSet = {},
    upperLimit = 1,
    lowerLimit = null,
    count,
    orderedDisplay = new Map()

  let tagsData = {},
    renderDataEtsy = data.etsy.edges,
    renderDataAirtable = data.airtable.edges,
    tagWeight = {},
    orderedTags = new Map()

  const DeSlug = text =>
    text.charAt(0).toUpperCase() + text.slice(1).replace(/_/g, ' ')

  const etsyTagList = renderDataEtsy.map(product => product.node.fields.tags)

  const airtableTagList = renderDataAirtable.map(product => product.node.data.tags)

  const mergedTags = [...airtableTagList, ...etsyTagList].filter(tag => tag).flat()// null truthy filter


  const tagCount = mergedTags.map(value => [
    mergedTags.filter(x => x === value).length,
    value,
  ])

  const tagsUnique = tagCount.filter(tag => tag[0] < renderDataEtsy.length, [])

  const tagsUniqueCounted = tagsUnique.filter(
    (s => a => (j => !s.has(j) && s.add(j))(JSON.stringify(a)))(new Set())
  )

  const tagsFiltered = tagsUniqueCounted
    // .filter((tag, i) => tagsUniqueCounted.indexOf(tag) === i)
    .filter(tag => !TagFilter.includes(tag[1]))

// console.log('tagsUniqueCounted',tagsUniqueCounted)


  return tagsFiltered
}
