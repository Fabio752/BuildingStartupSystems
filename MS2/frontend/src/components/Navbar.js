import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav
      className="navbar has-shadow"
      style={{ paddingTop: "5px", backgroundColor: "#F5F5F5" }}
    >
      <div
        className="container"
        style={{ paddingLeft: "32px", paddingRight: "32px" }}
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <figure className="image">
              <img className="is-rounded" src="./logo.png" alt="Logo" />
            </figure>
            <span className="has-text-weight-bold	pl-2">ClassQuestions</span>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {props.isSignedIn && (
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <Link to="/instructor-home" className="navbar-item">
                <i className="material-icons">person_outline</i>
                <div>{props.username}</div>
              </Link>
              <a className="button mt-1 is-dark" href="/logout">
                Logout
              </a>
            </div>
          </div>
        )}
        {!props.isSignedIn && (
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <a href="/instructor-home" className="button is-dark">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
