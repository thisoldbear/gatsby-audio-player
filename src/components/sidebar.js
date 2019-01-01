import React from 'react'
import classnames from 'classnames/bind'

import Post from './post.js'

import css from './sidebar.css'

const styles = classnames.bind(css)

const Sidebar = ({ posts, currentLocation }) => {
  return (
    <div className={styles('sidebar')}>
      {posts.map(({ node }, i) => (
        <Post
          slug={node.fields.slug}
          key={node.fields.slug}
          title={node.frontmatter.title}
          date={node.frontmatter.date}
        />
      ))}
    </div>
  )
}

export default Sidebar
