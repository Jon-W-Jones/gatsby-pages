import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import style from "../style/blog.module.scss"

export default ({ data: post }) => (
  <Layout>
    <h3 className={style.articleTitle}>
      {post.markdownRemark.frontmatter.title}{" "}
      <span className={style.articleDate}>
        - {post.markdownRemark.frontmatter.date}
      </span>
    </h3>
    <h4>
      {post.markdownRemark.timeToRead}{" "}
      {post.markdownRemark.timeToRead > 1 ? "minutes" : "minute"}
    </h4>
    <article>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </article>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      frontmatter {
        title
      }
    }
  }
`
