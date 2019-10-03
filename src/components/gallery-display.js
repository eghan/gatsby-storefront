import React, { useState, useCallback, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Img from 'gatsby-image'
import EmblaCarouselReact from 'embla-carousel-react'
import Modal from '../components/modal'
import { Consumer } from '../components/context'

import { Button } from '../utils/global'

const location =
  typeof window !== `undefined` ? window.location.pathname : '/gallery'

const Carousel = styled.div`
  display: grid;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width: 90%;
  margin: auto;
  @media (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`
const CarouselNavigation = styled(Button)`
  display: grid;
  font-size: 2em;
  padding: 0;
  margin: 0.3em 0.3em;
  color: grey;
  width: 3vw;
  height: 36vw;
  @media (max-width: 750px) {
    display: none;
  }
`
const CarouselNavLeft = styled(CarouselNavigation)`
  position: absolute;
  left: 0;
`
const CarouselNavRight = styled(CarouselNavigation)`
  position: absolute;
  right: 0;
`

const CarouselCenter = styled.div`
  /*  grid-area: 1/2;
  width: 100vw;*/
  margin: 0.5em;
`
const CarouselPhoto = styled(Img)`
  border: 1px solid black;
  height: 33vw;
  width: 33vw;
  margin: 1em 1em 0.5em 1em;
  @media (max-width: 750px) {
    margin: 0.1em;
    height: 70vw;
    width: 70vw;
  }
`
const PhotoGrid = styled.div`
  display: grid;
`
const PhotoModal = styled(Modal)`
  grid-area: 1 1 1 1;
`
const PhotoButton = styled(Button)`
  grid-area: 2 1 2 1;
  width: 40%;
  color: gray;
  margin: auto;
  font-size: 0.7em;
`

// props shape {props.id, props.name, props.childImageSharp.low}
const Gallery = props => {
  const photos = props.images
  const [embla, setEmbla] = useState(null)
  const scrollPrev = useCallback(() => embla.scrollPrev(), [embla])
  const scrollNext = useCallback(() => embla.scrollNext(), [embla])

  if (typeof window !== `undefined`) {
    let clickWait = false
    setInterval(() => {
      if (embla !== null && !clickWait) {
        embla.scrollNext()
      }
    }, 3500)
    document.addEventListener('click', () => {
      clickWait = true
      setTimeout(() => {
        clickWait = false
      }, 3500)
    })
  }

  useEffect(() => {
    if (embla) {
      embla.on('select', () => {
        console.log(`Current index is ${embla.selectedScrollSnap()}`)
      })
    }
  }, [embla])

  const StartPoint = Math.floor(Math.random() * photos.length)

  return (
      <Carousel>
        <CarouselNavLeft onClick={scrollPrev}>
          {'\u219C'}
          <br />
          {'\u219C'}
          <br />
          {'\u219C'}
        </CarouselNavLeft>
        <EmblaCarouselReact
          htmlTagName="div"
          emblaRef={setEmbla}
          options={{ loop: true, startIndex: StartPoint, speed: 18 }}
        >
          <CarouselCenter style={{ display: 'flex' }}>
            {photos.map(img => (
              <PhotoGrid>
                <PhotoModal
                  object={img}
                  doubleclick="true"
                  source={img.childImageSharp.low}
                  location={location}
                  name={img.name}
                  text="Inqure here"
                >
                  <CarouselPhoto
                    fadeIn={true}
                    key={img.id}
                    title={`Photo by Eghan Thompson`}
                    fluid={img.childImageSharp.low}
                    style={{ flex: '0 0 100%' }}
                  />
                </PhotoModal>
                <Consumer>
                  {({ data, set }) => (
                    <PhotoButton
                      onClick={() => {
                        set({
                          itemInquery: [img],
                        })
                        navigate('contact')
                      }}
                    >
                      inquiry
                    </PhotoButton>
                  )}
                </Consumer>
              </PhotoGrid>
            ))}
          </CarouselCenter>
        </EmblaCarouselReact>{' '}
        <CarouselNavRight onClick={scrollNext}>
          {'\u219D'}
          <br />
          {'\u219D'}
          <br />
          {'\u219D'}
        </CarouselNavRight>
      </Carousel>
  )
}

export default Gallery
