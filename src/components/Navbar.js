import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  return (
    <>
      <nav
        className="navbar is-light is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className={`navbar-item`}>
            <b> I-notebook</b>
          </Link>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link
              to="/"
              className={`navbar-item ${
                location.pathname === "/" ? "is-tab is-active" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`navbar-item ${
                location.pathname === "/about" ? "is-tab is-active" : ""
              }`}
            >
              About
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-small is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-small is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
