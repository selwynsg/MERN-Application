import React, { useState, useEffect, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentView.css';
import northeasternLogo from './northeasternLogo.png'
import Header from '../Components/Header.js';
import QuestionBar from '../Components/QuestionBar';
const StudentView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch('http://localhost:28017/info/autho/', {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 401) {
        navigate('/');
      } else {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate]);
  
  const handleLogout = async () => {
    const response = await fetch('http://localhost:28017/info/logout/', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      navigate('/');
    }
  };
  
  if (loading) {
    return (
    <div>loading....</div>
  )
} else{
  return (
    
    <div className="student-view">

      <div className="main-container">

      <div className="logo-bar">
  <img src={northeasternLogo} alt="Northeastern Logo" className="northeastern-logo" />
  <div className="logo-bar-item">
    <span><i className="fa fa-user-circle" aria-hidden="true"></i></span><br />
    <span>Account</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-tachometer" aria-hidden="true"></i></span><br />
    <span>Dashboard</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-users" aria-hidden="true"></i></span><br />
    <span>Groups</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-calendar" aria-hidden="true"></i></span><br />
    <span>Calendar</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-inbox" aria-hidden="true"></i></span><br />
    <span>Inbox</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-history" aria-hidden="true"></i></span><br />
    <span>History</span>
  </div>
  <div className="logo-bar-item">
    <span><i className="fa fa-question-circle" aria-hidden="true"></i></span><br />
    <span>Help</span>
          </div>
          <div onClick={handleLogout} className="logo-bar-item">
    <span><i className="fa fa-sign-out" aria-hidden="true"></i></span><br />
            <span>Logout</span>
  </div>
        </div>
        <Header props="Syllabus"/>
        <div className="sidebar">
  <div className="nav-item" >Home</div>
  <div className="nav-item" >Syllabus</div>
  <div className="nav-item" >Office Hours</div>
  <div className="nav-item" >Announcements</div>
  <div className="nav-item" >Assignments</div>
  <div className="nav-item" >Grades</div>
  <div className="nav-item" >Piazza</div>
  <div className="nav-item" >Gradescope</div>
  <div className="nav-item" >People</div>
  <div className="nav-item" >Files</div>
  <div className="nav-item" >Quizzes</div>
  <div className="nav-item" >Read-The-Room</div>
  <div className="nav-item"> <QuestionBar/></div>

</div>
      <div className="content">
        <h1>CS4992 Software Development Practicum (Spring 2023)</h1>

        <h2>Instructor</h2>
        <p className="instructor">Professor Fontenot</p>

        <h2>Useful Links</h2>
        <ul className="links">
          <li><a href="https://piazza.com/northeastern/spring2023/cs3650merged202330/home" target="_blank">Piazza</a></li>
          <li><a href="https://www.gradescope.com/courses/485102" target="_blank">Gradescope</a></li>
        </ul>

        <h2>To-Do List</h2>
        <ul className="todo">
          <li><span>Lab 9:</span> <small>Mar 27 at 10pm</small></li>
          <li><span>Lab 10:</span> <small>Mar 31 at 10pm</small></li>
          </ul>

        </div>
      </div>
    </div>
  );
};
}
export default StudentView;