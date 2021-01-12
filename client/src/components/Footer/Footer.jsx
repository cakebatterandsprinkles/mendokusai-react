import React from "react"
import classes from "./Footer.module.css"

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.footerText}>
        <span className={classes.star}>★</span>
        <p>Licensed under MIT. Contribute to the project at
          <span>
          {" "}
            <a
              href="https://github.com/cakebatterandsprinkles/mendokusai-react"
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              GitHub
            </a>
          </span>.
        </p>
      </div>
    </div>)
}

export default Footer