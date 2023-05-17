import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./Pages/main/main";
import { Login } from "./Pages/login";
import { Navbar } from "./components/Navbar";
import { Createpost } from "./Pages/create-post/create-post";

function App() {
  return (
    <div className="min-h-full h-screen ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<Createpost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
