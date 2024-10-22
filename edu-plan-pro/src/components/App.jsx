import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./login/Login.js"
import CoursesPlan from "./coursesplan/CoursesPlan.js";
import School from "./school/School.jsx";
import Faculty from "./faculty/Faculty.jsx";
import ValidateLogin from "./validatelogin/ValidateLogin.jsx";
import ValidateMain from "./validatelogin/ValidateMain.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<ValidateMain Login={Login} />} />
        <Route path="/coursesPlan" element={<ValidateLogin Component={CoursesPlan} />} />
        <Route path="/school" element={<ValidateLogin Component={School} />} />
        <Route path="/faculty" element={<ValidateLogin Component={Faculty} />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
