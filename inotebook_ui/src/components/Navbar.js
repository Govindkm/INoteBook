import React, { useEffect, useState } from "react";
import { Link, Router, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  let [isLoggedin, setLoggedIn] = useState(false);
  // equivalent to component did mount
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [location]);
  const navigate = useNavigate();

  function loginClickhandler(e) {
    if (isLoggedin) {
      localStorage.removeItem("auth-token");
    }
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link
          className={`navbar-brand nav-link ${
            location.pathname === "/" ? "active" : ""
          }`}
          to={"/"}>
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to={"/about"}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="ml-auto">
          <button className="btn btn-outline-light" onClick={loginClickhandler}>
            {isLoggedin ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}
