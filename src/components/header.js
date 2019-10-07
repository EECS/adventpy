import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"

function Header({ siteTitle }) {
  const [navBarActive, setNavBarActive] = useState(false)

  return (
    <header>
      <div className="hero-head">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              {siteTitle}
            </Link>
            <span
              className={`navbar-burger burger ${
                navBarActive ? "is-active" : ""
              }`}
              onClick={() => setNavBarActive(!navBarActive)}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div className={`navbar-menu ${navBarActive ? "is-active" : ""}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/projects">
                Projects
              </Link>
              <Link className="navbar-item" to="/contact">
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
