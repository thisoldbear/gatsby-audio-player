import React from 'react'
import Layout from '../components/layout'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'
import classnames from 'classnames/bind'

import Metatags from '../components/metatags'
import css from './blog-post.css'

const styles = classnames.bind(css)

function BlogPost(props) {
  const post = props.data.markdownRemark
  const url = props.data.site.siteMetadata.siteUrl
  const { title, description } = post.frontmatter
  const thumbnail = post.frontmatter.image.childImageSharp.resize.src
  const postList = props.data.allMarkdownRemark

  return (
    <Layout>
      <Metatags
        title={title}
        description={description}
        thumbnail={url + thumbnail}
        url={url}
        pathname={props.location.pathname}
      />
      <div className={styles('blog-post')}>
        <div className={styles('blog-post__body')}>
          <h1>{title}</h1>
          <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className={styles('blog-post__sidebar')}>
          {postList.edges.map(({ node }, i) => (
            <Link to={node.fields.slug} className="link" key={node.fields.slug}>
              <div
                className={styles('post-list', {
                  'post-list--current': props.location.pathname === node.fields.slug,
                })}
              >
                <h3>{node.frontmatter.title}</h3>
                <span>{node.frontmatter.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
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
