import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import classnames from 'classnames/bind'

import { AudioContext } from '../context/audio'

import Metatags from '../components/metatags'
import Sidebar from '../components/sidebar'

import css from './blog-post.css'

const styles = classnames.bind(css)

const BlogPost = ({
  data: {
    markdownRemark: {
      frontmatter: {
        title,
        description,
        image: {
          childImageSharp: {
            fluid: fluidImage,
            resize: { src: thumbnailSrc },
          },
        },
      },
      html,
    },
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location: { pathname },
  ...rest
}) => {
  return (
    <AudioContext.Consumer>
      {context => (
        <>
          <Metatags
            title={title}
            description={description}
            thumbnail={siteUrl + thumbnailSrc}
            url={siteUrl}
            pathname={pathname}
          />
          {console.log(context)}
          <div className={styles('blog-post')}>
            <div className={styles('blog-post__body')}>
              <h1>{title}</h1>
              <Img fluid={fluidImage} />
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <button className={styles('blog-post__play-button')} onClick={()=> {
                context.setAudioSrc('https://npr-poc-fe.netlify.com/audio/track-two.mp3')
              }}>Play Track Two</button>
            </div>
            <div className={styles('blog-post__sidebar')}>
              <Sidebar />
            </div>
          </div>
        </>
      )}
    </AudioContext.Consumer>
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

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
