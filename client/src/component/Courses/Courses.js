import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './courses.css'
const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div >
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
                  to="/"
                  className="nav-link signin active"
                  aria-current="page"
                >
                 
                  print
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='course'>
      <h1>Course List</h1>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <span className="course-title">{course.title}</span> -{' '}
            <span className="course-duration">{course.duration}</span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Courses;
