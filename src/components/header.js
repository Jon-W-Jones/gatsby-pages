import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Logo from "../images/Jon-Logo.png"
import style from "./header.module.scss"
import Img from "gatsby-image"

const LOGO_QUERY = graphql`
  query {
    file(relativePath: { eq: "Jon-Logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

const Header = ({ siteTitle }) => {
  const logo = useStaticQuery(LOGO_QUERY)
  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <span className={style.titleRow}>
          {/* Colors will change, this is a placeholder logo color... well the whole header is kind of a placeholder. */}
          <Img
            fluid={logo.file.childImageSharp.fluid}
            alt="Jon Jones Logo"
            src={Logo}
            className={style.logo}
          />
          <h1 className={style.titleContainer}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </span>
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
