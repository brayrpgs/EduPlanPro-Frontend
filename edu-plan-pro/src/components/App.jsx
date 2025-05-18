import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./login/Login.jsx"
import School from "./school/School.jsx";
import Faculty from "./faculty/Faculty.jsx";
import Career from "./career/Career.jsx";
import Teacher from "./teacher/Teachear.jsx"
import User from "./user/User.jsx"
import Report from "./report/Report.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import StudyPlans from "./studyplans/StudyPlans.jsx"
import ValidateLogin from "./validatelogin/ValidateLogin.jsx";
import ValidateMain from "./validatelogin/ValidateMain.jsx";
import Pagination from "./pagination/Pagination.jsx";
import Preference from "./preference/Preferences.jsx";
import ServerError from "./validatelogin/ServerError.jsx";
import PageNotFound from "./componentsgeneric/PageNotFound.jsx";
import CoursesProgram from "./coursesprogram/CoursesProgram.jsx";
import { useThemePreferences } from './preference/useThemePreferences.jsx';
import { RecyclingBin } from "./recyclingbin/RecyclingBin.jsx";


function App() {
  useThemePreferences();
  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<ValidateMain Login={Login} />} />
        <Route path="/coursesProgram" element={<ValidateLogin Component={CoursesProgram} />} />
        <Route path="/school" element={<ValidateLogin Component={School} />} />
        <Route path="/faculty" element={<ValidateLogin Component={Faculty} />} />
        <Route path="/career" element={<ValidateLogin Component={Career} />} />
        <Route path="/teacher" element={<ValidateLogin Component={Teacher} />} />
        <Route path="/user" element={<ValidateLogin Component={User} />} />
        <Route path="/report" element={<ValidateLogin Component={Report} />} />
        <Route path="/dashboard" element={<ValidateLogin Component={Dashboard} />} />
        <Route path="/studyPlans" element={<ValidateLogin Component={StudyPlans} />} />
        <Route path="/pagination" element={<ValidateLogin Component={Pagination} />} />
        <Route path="/preference" element={<ValidateLogin Component={Preference} />} />
        <Route path="/recyclingbin" element={<ValidateLogin Component={RecyclingBin} />} />
        <Route path="/serverError" element={<ServerError />} />
        <Route path="*" Component={PageNotFound} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
