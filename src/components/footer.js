import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

function Footer ({siteTitle}){

  return(
    <footer className="footer">
      <div className="has-text-centered">
        <div className="columns">
          <div className="column is-one-quarter-desktop is-full-mobile">
            <Link to="/">
              {siteTitle}
            </Link>
          </div>
          <div className="column is-one-quarter-desktop is-full-mobile">
            <Link to="/projects">
              Projects
            </Link>
          </div>
          <div className="column is-one-quarter-desktop is-full-mobile">
            <Link to="/contact">
              Contact Us
            </Link>
          </div>
          <div className="column is-one-quarter-desktop is-full-mobile">
            <p>
              © {new Date().getFullYear()} {siteTitle}
            </p>
          </div>
        </div>
      </div>
  </footer>
  );
}

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer
