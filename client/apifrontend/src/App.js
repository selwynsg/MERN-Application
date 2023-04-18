import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentView from './views/StudentView';
import TeacherView from './views/TeacherView';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/homePage" element={<StudentView />}/>
        <Route  path="/" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route  path="/teacherPage" element={<TeacherView />}/>
      </Routes>
    </Router>
  );
}

export default App;
