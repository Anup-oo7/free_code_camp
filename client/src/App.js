import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginSignup from './component/Account/LoginSignup'
import Home from "./component/home/Home";
import Courses from "./component/Courses/Courses";
const App = () => {
  return (
    <>
      <BrowserRouter>
       
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/selectCourses/:_id" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
