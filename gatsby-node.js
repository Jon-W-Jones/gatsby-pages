/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require("gatsby-source-filesystem")

const path = require("path")
const blogPostTemplate = path.resolve("./src/templates/blog-post-template.js")
const blogPageTemplate = path.resolve("./src/templates/blog-page-template.js")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  //if node is a MarkDownRemark, then create a custom slug for file gen.
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({ node, name: "slug", value: slug })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 999) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })
  const numPosts = posts.length
  const postsPerPage = 2
  const totalPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: totalPages }).forEach((_, index) => {
    const currentPage = index + 1
    const isFirstPage = index === 0
    const isLastPage = currentPage === totalPages

    createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
      component: blogPageTemplate,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
        numPosts,
      },
    })
  })
}
