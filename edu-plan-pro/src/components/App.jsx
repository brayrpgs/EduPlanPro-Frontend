import React from "react";  
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login} from "./login/Login.js"

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
