import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Post from '../components/post'

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark
  return (
    <Layout>
      {postList.edges.map(({ node }, i) => (
        <Post
          slug={node.fields.slug}
          key={node.fields.slug}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          excerpt={node.excerpt}
        />
      ))}
    </Layout>
  )
}

export default IndexPage

export const listQuery = graphql`
  query ListQuery {
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
