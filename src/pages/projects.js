import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShareSquare } from "@fortawesome/free-regular-svg-icons"

import Euler from "../static/images/Leonhard_Euler.jpg"

function Projects({ data }) {
  const projects = data.allMdx.edges.map(design => {
    const maxDesc = 80
    let description = design.node.frontmatter.description
    if (description.length > maxDesc) {
      description = description.slice(0, maxDesc)
      description = description.concat("...")
    }

    return (
      <div className="column is-one-third is-full-mobile" key={design.node.id}>
        <div className="card">
          <div className="card-image">
            <Link
              to={design.node.fields.slug}
              style={{ textDecoration: "None" }}
            >
              <figure className="image">
                <img src={Euler} alt="Placeholder image" />
              </figure>
            </Link>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <Link
                  to={design.node.fields.slug}
                  style={{ textDecoration: "None" }}
                >
                  <p className="title is-5">
                    {design.node.frontmatter.seoTitle}
                  </p>
                </Link>
              </div>
            </div>

            <div className="content">{description}</div>
            <footer className="card-footer columns">
              <div className="column card-footer-item is-four-fifths">
                <span>
                  <Link
                    to={design.node.fields.slug}
                    style={{ textDecoration: "None" }}
                  >
                    <p className="has-text-primary hover-dark">
                      Read more &rarr;
                    </p>
                  </Link>
                </span>
              </div>
              <p className="card-footer-item">
                <span className="icon is-medium">
                  <FontAwesomeIcon icon={faShareSquare} />
                </span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    )
  })

  return (
    <Layout>
      <SEO
        title="Projects"
        description="Landing page for all projects in Python."
      />
      <section className="hero is-fullheight" style={{ paddingTop: "2em" }}>
        <div className="container">
          <div className="columns">
            <div className="column is-full">
              <h1 className="title is-1 has-text-centered">
                <u>Projects Blog</u>
              </h1>
            </div>
          </div>
          <div className="columns is-centered is-multiline">{projects}</div>
        </div>
      </section>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query ProjectsQuery {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fields: { slug: { regex: "/projects/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            seoTitle
            description
          }
        }
      }
    }
  }
`
