import React from 'react'
import { graphql } from "gatsby"

import SEO from '../components/seo'

const AboutPage = ({ data }) => (
  <>
    <SEO title="About" />
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>Talkin' 'bout loooooooove.</p>
  </>
)

export default AboutPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
