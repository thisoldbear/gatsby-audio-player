import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames/bind'

import css from './post.css'

const styles = classnames.bind(css)

const Post = ({ slug, title, date, excerpt }) => {
  return (
    <Link to={slug} className={styles('post')}>
      <h2>{title}</h2>
      <span>{date}</span>
      {excerpt && <p>{excerpt}</p>}
    </Link>
  )
}

export default Post
