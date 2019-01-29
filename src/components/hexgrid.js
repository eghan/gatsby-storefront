import React, { Component } from 'react'
import './hexgrid.css'
import Img from 'gatsby-image'
import styled from 'styled-components'
import TextModal from '../components/textmodal'

const Photo = styled(Img)`
  height: 480px;
  margin: 5px auto;
`

class Grid extends Component {
  render() {
    const location =
      typeof window !== `undefined` ? window.location.pathname : '/shop'

    return (
      <ul id="grid" class="clr">
        {this.props.data.map((edge, i) =>
          edge.node.data.photo.localFiles.map((img, i) => (
            <TextModal
              source={img.childImageSharp.low}
              location={location}
              name={img.name}
            >
              <li>
                <div class="hexagon">
                  <Photo
                    key={img.id}
                    title={`Photo by Eghan Thompson`}
                    fluid={img.childImageSharp.low}
                  />
                  <p>{i}</p>
                </div>
              </li>
            </TextModal>
          ))
        )}
      </ul>

      //
      //
      //     <li>
      //         <div class="hexagon">
      //         <Photo
      //           key={this.props.id}
      //           title={`Photo by Eghan Thompson`}
      //           fluid={this.props.image}
      //         />
      //           <p>test</p>
      //         </div>
      //     </li>
    )
  }
}

export default Grid
