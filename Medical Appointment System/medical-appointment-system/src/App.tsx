import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PatientDashboard from './pages/PatientDashboard';
import BookAppointment from './pages/BookAppointment';
import UpdateAppointment from './pages/UpdateAppointment';


function App() {
  return (
    <div className='container'>
      <Router>
       <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" />
                <Route path="/contact-us" />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={< Register />}/>
                <Route path="/patient-dashboard" element={<PatientDashboard/>}/>
                <Route path="/book" element={<BookAppointment/>}/>
                <Route path="/update-book/:id" element={<UpdateAppointment/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
