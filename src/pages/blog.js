import React from "react"
import Layout from "../components/layout"
import { useStaticQuery } from "gatsby"

import style from "./blog.module.scss"

const MARKDOWN_QUERY = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`

const Blog = () => {
  const data = useStaticQuery(MARKDOWN_QUERY)
  console.log(data)
  return (
    <Layout>
      <h2 className={style.blogHeader}>Jon's Occasional Blog</h2>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <div key={`Article ${index}`} className={style.articleContainer}>
          <h3 className={style.articleTitle}>
            {node.frontmatter.title}{" "}
            <span className={style.articleDate}>- {node.frontmatter.date}</span>
          </h3>
          <article>{node.excerpt}</article>
        </div>
      ))}
    </Layout>
  )
}

export default Blog
