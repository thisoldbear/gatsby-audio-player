import React from 'react'
import { graphql } from 'gatsby'

import Post from '../components/post'
import SEO from '../components/seo'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  return (
    <>
      <SEO title="Home" />
      {edges.map(({ node }, i) => (
        <Post
          slug={node.fields.slug}
          key={node.fields.slug}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          excerpt={node.excerpt}
        />
      ))}
    </>
  )
}

export default IndexPage

export const postListQuery = graphql`
  query PostListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
          }
        }
      }
    }
  }
`
