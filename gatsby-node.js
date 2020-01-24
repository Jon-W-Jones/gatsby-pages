/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require("gatsby-source-filesystem")

const path = require("path")
const blogPostTemplate = path.resolve("./src/templates/blog-post-template.js")

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
      allMarkdownRemark {
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
}
