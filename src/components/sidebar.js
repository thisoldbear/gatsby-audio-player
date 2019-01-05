import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import classnames from 'classnames/bind'

import Post from './post.js'

import css from './sidebar.css'

const styles = classnames.bind(css)

const Sidebar = () => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
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
      }
    `}
    render={data => (
      <div className={styles('sidebar')}>
        {data.allMarkdownRemark.edges.map(({ node }, i) => (
          <Post
            slug={node.fields.slug}
            key={node.fields.slug}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
          />
        ))}
      </div>
    )}
  />
);

export default Sidebar
