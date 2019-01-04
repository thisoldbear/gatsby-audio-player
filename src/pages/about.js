import React from 'react'
import { graphql } from "gatsby"

import Layout from '../components/layout'
import SEO from '../components/seo'

const AboutPage = ({ data }) => (
  <Layout>
    <SEO title="About" />
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>Talkin' 'bout loooooooove.</p>
  </Layout>
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
