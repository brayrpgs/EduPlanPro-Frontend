import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./login/Login.jsx"
import CoursesPlan from "./coursesplan/CoursesPlan.js";
import School from "./school/School.jsx";
import Faculty from "./faculty/Faculty.jsx";
import Teacher from "./teacher/Teachear.jsx"
import User from "./user/User.jsx"
import ValidateLogin from "./validatelogin/ValidateLogin.jsx";
import ValidateMain from "./validatelogin/ValidateMain.jsx";
import Pagination from "./pagination/Pagination.jsx";


function App() {
  return (
    
    <BrowserRouter>

      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<ValidateMain Login={Login} />} />
        <Route path="/coursesPlan" element={<ValidateLogin Component={CoursesPlan} />} />
        <Route path="/school" element={<ValidateLogin Component={School} />} />
        <Route path="/faculty" element={<ValidateLogin Component={Faculty} />} />
        <Route path="/teacher" element={<ValidateLogin Component={Teacher} />} />
        <Route path="/user" element={<ValidateLogin Component={User} />} />
        <Route path="/pagination" element={<ValidateLogin Component={Pagination} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
