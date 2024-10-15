import React from "react";  
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Login} from "./login/Login.js"
import Main from "./main/Main.js";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
