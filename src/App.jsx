import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="/STUDENT/:id" element={<StudentPage />} />
        <Route path="/TEACHER/:id" element={<TeacherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;