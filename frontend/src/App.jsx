import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Component from "./Components/List"
import Signin from "./Components/Signin"
import Login from '../src/Components/Login'
import Create from './Components/Create';
import Error from './Components/Error';
import Employee from './Components/Employee';
import normal from './Components/Normaluser';
import Normal from './Components/Normaluser';
const App = () => {
  return (
    <Router>
       
      <Routes>
        <Route path="/" element={<Signin/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Signin/>} />
        <Route path="/Employees" element={<Employee></Employee>} />
        <Route path="/normal" element={<Normal></Normal>} />
        <Route path="/Home" element={<Component />} />  
        <Route path="*" element={<Error/>} />
      </Routes>
    </Router>
  );
}

export default App;
