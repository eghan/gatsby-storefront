import React from 'react'
import { Link, graphql, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import { Button } from '../utils/global'
import { Consumer } from '../components/context'
import Modal from '../components/modal'
import TagPreview from '../components/tag-preview'
import PaypalExpressBtn from 'react-paypal-express-checkout'

import { Categories, CategoriesMobile } from '../components/categories'
import { TagFilter } from '../utils/global'

const tagExclude = TagFilter

const Container = styled.div`
  /*padding: 1em;*/
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*grid-gap: 0.5em;*/
  /*height: 88vh;*/
  /*object-fit: contain;*/
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding: 0;
    height: auto;
  }
  /*border: 3px dashed aqua;*/
`
const Product = styled.div`
  grid-area: 1 / 2 / 1 / 2;
  width: 85vw;
  /*position: grid;*/
  display: grid;
  @media (max-width: 750px) {
    width: 95vw;
  }
`
const LeftSide = styled.div`
  padding: 2em 1em;
  grid-area: 1 / 1 / 1 / 1;

  @media (max-width: 750px) {
    overflow: hidden;
    /*height: 50vh;*/
  }
  /*border: 5px dashed blue;*/
`
const RightSide = styled.div`
  /*display: grid;*/
  padding: 1em;
  grid-area: 1 / 2 / 1 / 2;
  /*grid-row: span 5;*/
  /*border: 5px dashed blue;*/
  /*height: 80vh;*/
`
const Info = styled.div`
  padding: 0.5rem 0.7rem;
  font-size: 0.8em;
  /*margin: 1rem auto;*/
`

const TextDiv = styled.div`
  padding: 0 2em 0 0;
  grid-column: span 2;
  @media (max-width: 750px) {
    display: none;
    padding: 0 0 0 0.5em;
    width: 95vw;
  }
  /*border: 5px dashed green;*/
`

const Photo = styled(Img)`
  width: 35vw;
  padding: 2em 0;
  /*height: 83vh;*/
  @media (max-width: 750px) {
    width: 100vw;
    /*height: 50vh;*/
    /*float: left;*/
  }
`
const Previews = styled.div`
  /*position: absolute;*/
  /*bottom: 0;*/
  /*width: 100%;*/
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /*border: 2px dotted magenta;*/
  @media (max-width: 750px) {
    position: relative;
    /*display: block;*/
    /*width: 100%;*/
    /*padding: 0 0 0 10px;*/
    /*border: 2px groove red;*/
  }
`
const PhotoPreview = styled(Img)`
  /*border: 30px groove pink;*/
  /*display: inline-block;*/
  margin: auto;
  /*max-width: 80%;*/
  /*max-height: 30%;*/
  width: 10em;
  height: 10em;
  /*vertical-align: bottom;*/
  @media (max-width: 750px) {
    border: 8px solid white;
    width: 100%;
    height: auto;
  }
`
const Related = styled.div`
  margin: 0 0.5em;
  padding: 0.2em 0;
  text-align: center;
  border: 1px solid black;
  @media (max-width: 750px) {
    margin: 1em 0 0 0;
  }
`

const PaymentDiv = styled.div`
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.3em 1em 0 0;
  text-align: center;
  @media (max-width: 750px) {
    width: 50vw;
    padding: 0.3em 2em 0 0;
  }
  /*border: 10px dashed indigo;*/
`
const Price = styled.div`
  font-size: 0.8em;
  padding: 0.5em;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  @media (max-width: 750px) {
    /*width: 50vw;  */
    /*padding: 3em 1em 1em 0;*/
    line-height: 1.8em;
  }
`
const TagDiv = styled.div`
  font-size: 0.8em;
  padding: 0.8em;
  text-align: center;
  @media (max-width: 750px) {
    padding: 0.8em;
    /*width: 50vw;    */
    /*border: 2px dotted blue;*/
  }
`
const CartButton = styled(Button)`
  font-size: 1.1em;
  @media (max-width: 750px) {
    font-size: 0.9;
  }
`
const PayLabel = styled.div`
  padding: 0.8em;
`
// const CategoriesMobile = styled(Categories)`
//   display: none;
//   @media(max-width: 750px){
//     display: inline-block;
//   }
// `

export default ({ data }) => {
  const client = {
    sandbox:
      'AQEQxTyMZgiKTIdMx5TRiesx-eZeaWMWT7RSMat39X_5V8ok4pU3BvJ_ZKeuEEt8JsW7f7X992jYz_Jg',
    production:
      'AQEQxTyMZgiKTIdMx5TRiesx-eZeaWMWT7RSMat39X_5V8ok4pU3BvJ_ZKeuEEt8JsW7f7X992jYz_Jg',
  }

  const style = {
    label: 'paypal',
    size: 'small', // small | medium | large | responsive
    shape: 'pill', // pill | rect
    color: 'black', // gold | blue | silver | black
  }

  const {
    id,
    name,
    description,
    price,
    image,
    imageA,
    imageB = null,
    fields: { tags = [] },
  } = data.etsy

  //  -- document refrences in gatsby must be wrapped for SSR --
  //const productImage = document.getElementById('mainImage')

  //   const IndexPage = (props) => (
  //   <Layout>
  //     <p>This works {props.location.pathname}</p>
  //   </Layout>
  // )

  // window location has to be manually passed at page render
  // unless I parse it from the url, which is fault prone
  // and said location query must be wrapped in a conditional to pass static generation
  // console.log(Location.pathname)
  const location =
    typeof window !== `undefined` ? window.location.pathname : '/shop'

  const tagList = tags
    .filter(t => !tagExclude.includes(t))
    .map((tag, index) => {
      let tagLowerCase = tag
      tag = tag.charAt(0).toUpperCase() + tag.slice(1).replace(/_/g, ' ')
      return (
        <Button
          onClick={() => {
            navigate(tagLowerCase)
          }}
        >
          <div key={tag}> {tag} </div>
        </Button>
      )
    })

  return (
    <>
      <Container>
        {/* <CategoriesMobile /> */}
        <Categories />
        <Product>
          <LeftSide>
            <Modal source={image.childImageSharp.fluid} location={location}>
              <Photo
                title={`Photo by Eghan Thompson`}
                fluid={image.childImageSharp.fluid}
                id="mainImage"
                text={name}
              />
            </Modal>
          </LeftSide>
          <RightSide>
            <TextDiv>
              <div>{name}</div>
              <Info>{description}</Info>
            </TextDiv>
            <PaymentDiv>
              <TagDiv>
                Categories:
                <br />
                {tagList}
              </TagDiv>
              <Price>
                <PayLabel>with free shipping: {price} $</PayLabel>
                <Consumer>
                  {({ data, set }) => {
                    return (
                      <div>
                        <CartButton
                          onClick={() => {
                            set({
                              itemList: [
                                ...data.itemList,
                                {
                                  name,
                                  price,
                                  image: image.childImageSharp.fluid,
                                },
                              ],
                            })
                            navigate('cart')
                          }}
                        >
                          add item to cart
                        </CartButton>
                      </div>
                    )
                  }}
                </Consumer>
                <PayLabel>or... just get this one with -></PayLabel>
                <PaypalExpressBtn
                  client={client}
                  currency={'USD'}
                  total={Number(price)}
                  style={style}
                />
              </Price>
            </PaymentDiv>
            <Previews>
              {imageA == null ? (
                <div />
              ) : (
                <Modal
                  source={imageA.childImageSharp.fluid}
                  location={location}
                >
                  <PhotoPreview
                    title={`Photo by Eghan Thompson`}
                    fluid={imageA.childImageSharp.fluid}
                  />
                </Modal>
              )}
              {imageB == null ? (
                <div />
              ) : (
                <Modal
                  source={imageB.childImageSharp.fluid}
                  location={location}
                >
                  <PhotoPreview
                    title={`Photo by Eghan Thompson`}
                    fluid={imageB.childImageSharp.fluid}
                  />
                </Modal>
              )}
            </Previews>
          </RightSide>
        </Product>
      </Container>
      <Related>Related pieces:</Related>
      <TagPreview tags={tags.filter(t => !tagExclude.includes(t))} />
    </>
  )
}
export const query = graphql`
  query etsyData($name: String!) {
    etsy: etsyListingsDownloadCsv(TITLE: { eq: $name }) {
      id
      name: TITLE
      description: DESCRIPTION
      price: PRICE
      image {
        childImageSharp {
          fluid(quality: 100, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      imageA {
        childImageSharp {
          fluid(quality: 80, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      imageB {
        childImageSharp {
          fluid(quality: 80, maxHeight: 850) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
            presentationWidth
            presentationHeight
          }
        }
      }
      fields {
        tags
      }
    }
  }
`
