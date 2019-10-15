const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const codePost = path.resolve(`./src/templates/code-post.js`)
  const appPost = path.resolve(`./src/templates/app-post.js`)
  return graphql(
    `
      {
        projects: allMdx(
          filter: { fields: { slug: { regex: "/projects/" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                fullTitle
                seoTitle
                date
              }
            }
          }
        }
        apps: allMdx(filter: { fields: { slug: { regex: "/apps/" } } }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                fullTitle
                seoTitle
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create project post pages
    result.data.projects.edges.forEach((post, index) => {
      const previous = index === 0 ? null : result.data.projects[index - 1]
      const next =
        index === result.data.projects.length - 1
          ? null
          : result.data.projects[index - 1]

      createPage({
        path: post.node.fields.slug,
        component: codePost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    // Create application post pages.
    result.data.apps.edges.forEach((post, index) => {
      const previous = index === 0 ? null : result.data.apps[index - 1]
      const next =
        index === result.data.apps.length - 1
          ? null
          : result.data.apps[index - 1]

      createPage({
        path: post.node.fields.slug,
        component: appPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
