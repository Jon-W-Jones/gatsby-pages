import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

import style from "../style/blog.module.scss"

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(fromNow: true)
          }
          excerpt(format: HTML)
        }
      }
    }
  }
`

const Blog = ({ data, pageContext }) => {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    totalPages,
    numPosts,
  } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage =
    currentPage - 1 === 1 ? "/blog" : `/blog/${String(currentPage - 1)}`
  return (
    <Layout>
      <h2 className={style.blogHeader}>Jon's Occasional Blog</h2>
      <div className={style.postCountSubheader}>{numPosts} Posts</div>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <div key={`Article ${index}`} className={style.articleContainer}>
          <h3 className={style.articleTitle}>
            <Link to={`posts${node.fields.slug}`}>
              {node.frontmatter.title}
            </Link>{" "}
            <span className={style.articleDate}>- {node.frontmatter.date}</span>
          </h3>
          <article>
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </article>
        </div>
      ))}
      <div className={style.paginationContainer}>
        {!isFirstPage && (
          <Link to={prevPage} rel="prev">
            Previous Page
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, index) => (
          <Link key={index} to={`/blog/${index === 0 ? "" : index + 1}`}>
            {index + 1}
          </Link>
        ))}
        {!isLastPage && (
          <Link to={nextPage} rel="next">
            Next Page
          </Link>
        )}
      </div>
    </Layout>
  )
}

export default Blog
