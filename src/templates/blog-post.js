import React from 'react'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import classnames from 'classnames/bind'

import Metatags from '../components/metatags'
import Sidebar from '../components/sidebar'

import css from './blog-post.css'

const styles = classnames.bind(css)

const BlogPost = (props) => {
  const post = props.data.markdownRemark
  const url = props.data.site.siteMetadata.siteUrl

  const { title, description, image } = post.frontmatter

  const fluidImage = image.childImageSharp.fluid
  const thumbnail = image.childImageSharp.resize.src

  const html = post.html

  const postList = props.data.allMarkdownRemark.edges
  const location = props.location.pathname

  return (
    <Layout>
      <Metatags
        title={title}
        description={description}
        thumbnail={url + thumbnail}
        url={url}
        pathname={location}
      />
      <div className={styles('blog-post')}>
        <div className={styles('blog-post__body')}>
          <h1>{title}</h1>
          <Img fluid={fluidImage} />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <div className={styles('blog-post__sidebar')}>
          <Sidebar posts={postList} currentLocation={location} />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query PostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        path
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
          }
        }
      }
    }

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
