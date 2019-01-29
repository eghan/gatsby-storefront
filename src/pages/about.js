import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/layout'
import Footer from '../components/footer'

const AboutDiv = styled.div`
    padding: 30px;
`

const About = () => (
  <Layout>
    <AboutDiv>
    <h1>Hi stuff about Artofactory</h1>
    <p>Cool stuff yall</p>Lorem ipsum dolor amet echo park man braid pug venmo,
    raw denim literally trust fund drinking vinegar pour-over letterpress tilde
    kale chips disrupt wolf sustainable. Helvetica typewriter cornhole vaporware
    copper mug yr. Single-origin coffee tousled banjo, meditation scenester
    leggings microdosing chillwave venmo cloud bread kogi salvia trust fund
    cronut. Chillwave hella godard flannel meh. Brooklyn tousled drinking
    vinegar seitan ramps. Yr kinfolk fixie chambray typewriter gochujang. Squid
    tofu pour-over, lumbersexual taiyaki try-hard lomo intelligentsia literally
    quinoa. Meditation neutra taiyaki freegan literally. 90's truffaut poutine,
    pork belly taiyaki church-key tacos skateboard tumeric. Vexillologist swag
    tbh cardigan lyft shoreditch waistcoat pork belly taxidermy humblebrag tote
    bag pickled copper mug artisan small batch. Venmo 90's craft beer ugh,
    selvage cold-pressed keytar celiac freegan keffiyeh pork belly. Listicle
    cronut yr tilde, fingerstache jianbing pitchfork tote bag church-key lyft
    edison bulb iceland 90's asymmetrical neutra. Brooklyn taiyaki authentic
    chia asymmetrical. Hoodie YOLO everyday carry, gochujang twee taiyaki
    waistcoat artisan XOXO deep v live-edge.
    <Link to="/">Go back to the homepage</Link>
    </AboutDiv>
  </Layout>
)

export default About
