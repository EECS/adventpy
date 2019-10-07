import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const shortcodes = {
  h1: props => <h1 className="subtitle is-3 is-primary" {...props} />,
  h2: props => <h2 className="subtitle is-5 is-primary" {...props} />,
  p: props => <p style={{ margin: "1%", fontSize: "20px" }} {...props} />,
  main: props => <main className="box" {...props} />,
}

class CodePostTemplate extends React.Component {
  render() {
    {
      /* Props come from the pageQuery at the bottom of the file. */
    }
    const post = this.props.data.mdx

    return (
      <Layout>
        <SEO title={post.frontmatter.seoTitle} description={post.excerpt} />
        <MDXProvider components={shortcodes}>
          <h1 className="has-text-centered title is-1">
            {post.frontmatter.fullTitle}
          </h1>
          <MDXRenderer>{post.body}</MDXRenderer>
          <br />
          <br />
          <Link className="has-text-centered" to="/projects/">
            <h3 className="subtitle is-3 has-text-link">
              Go back to the projects page.
            </h3>
          </Link>
        </MDXProvider>
      </Layout>
    )
  }
}

export default CodePostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      excerpt(pruneLength: 160)
      frontmatter {
        fullTitle
        seoTitle
        date
      }
    }
  }
`
