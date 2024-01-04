// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/register" exact element={<RegisterComponent />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
