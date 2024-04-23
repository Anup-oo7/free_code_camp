import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./home.css";

function Home() {
  return (
    <div>
      <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control searchBar me-2"
              type="search"
              placeholder="Search  8,000+ tutorials"
              aria-label="Search"
            />
          </form>
          <Link to="/" className="navbar-brand">
            {" "}
            {/* Use Link instead of a */}
            Free code camp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active signin"
                  aria-current="page"
                >
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link signin active"
                  aria-current="page"
                >
                 
                  Sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="textsAdvetisement">
        <h3>Learn to code-for free</h3>
        <h3>Build Projects</h3>
        <h3>Earn certifications</h3>
        <p>Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten <br />
           jobs at tech companies including: <br />
           <ul className="companies">
            <li>Google</li>
            <li>Microsoft</li>
            <li>Spotify</li>
            <li>amazon.com</li>
           </ul>
          </p>
          <Link to='/login' className="getStart">Get started (it's free)</Link>
      </div>
    </div>
  );
}

export default Home;
