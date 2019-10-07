import React from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Adventures in Python 
          </h1>
          <h2 className="subtitle">
            Projects for the Python programming language.
          </h2>
          <div style={{paddingTop: "2em"}}>
            <Link to="projects">
              <button className="button is-primary is-outlined is-large">
                Projects 	&rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    
  </Layout>
)

export default IndexPage
