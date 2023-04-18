import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherView.css";
import northeasternLogo from "./northeasternLogo.png";
import io from "socket.io-client";
import Header from "../Components/Header.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import ProfileIcon from "../Components/ProfileIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BarGraph from "../Components/BarGraph.js";
import styled from 'styled-components';

const theme = createTheme({
  palette: {
    primary: {
      main: "#b52828",
    },
  },
});

const socket = io("http://localhost:28017/");

const TeacherView = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedNavItem, setSelectedNavItem] = useState("Read the Room");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuQuestionIndex, setMenuQuestionIndex] = useState(null);
  const [pastLectures, setPastLectures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTranscripts, setShowTranscripts] = useState([]);

  const data = [
    {
      name: "Slide 1",
      uv: 100,
    },
    {
      name: "Slide 3",
      uv: 400,
    },
    {
      name: "Slide 4",
      uv: 2000,
    },
    {
      name: "Slide 7",
      uv: 2500,
    },
    {
      name: "Slide 9",
      uv: 400,
    },
    {
      name: "Slide 11",
      uv: 1500,

    },
    {
      name: "Slide 16",
      uv: 1250,
    },
    {
      name: "Slide 20",
      uv: 900,
    },
    {
      name: "Slide 25",
      uv: 800,
    },
    {
      name: "Slide 26",
      uv: 700,
    },
    {
      name: "Slide 27",
      uv: 700,
    },
    {
      name: "Slide 31",
      uv: 900,
    },
    {
      name: "Slide 37",
      uv: 700,
    }
  ];

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch("http://localhost:28017/info/autho/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    // ...
    // Set up event listener for incoming questions
    socket.on("new-question", (question) => {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        { ...question, read: false },
      ]);
    });
    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off("new-question");
    };
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchPastLectures = async () => {
      if (!selectedDate) return;
  
      try {
        const response = await fetch(
          `http://localhost:28017/questions/grouped?date=${selectedDate}`
        );
        if (response.ok) {
          const data = await response.json();
          setPastLectures(data);
          console.log(data);
        } else {
          console.error("Error fetching past lectures. Status:", response.status);
        }
        
      } catch (error) {
        console.error("Error fetching past lectures:", error);
      }
    };
  
    fetchPastLectures();
  }, [selectedDate]);

  


  
  
  const handleLogout = async () => {
    const response = await fetch("http://localhost:28017/info/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      navigate("/");
    }
  };

  const handleMenuClick = (event, index) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuQuestionIndex(index);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleRemoveQuestion = (event, index) => {
    event.stopPropagation();
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
    handleMenuClose(event);
  };
  const handleToggleRead = (event, index) => {
    event.stopPropagation();
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, read: !question.read } : question
      )
    );
    handleMenuClose(event);
  };

  const handleViewTranscript = (index) => {
    setShowTranscripts((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

function randomizeUV(data) {
  const newData = data.map((item) => {
    const newUV = Math.floor(Math.random() * (2500 - 100 + 1)) + 100;
    return {
      ...item,
      uv: newUV,
    };
  });
  return newData;
}

  
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return questions.map((question, index) => (
          <div key={index} className="q-box">
            <div className="s-info">
              <ProfileIcon className="profile-icon" />
              <div className="question-details">
                <h4>
                  {question.studentName} {" Selwyn "}
                  {new Date(question.timestamp).toLocaleTimeString()}
                </h4>
                <div className="q-menu">
                  <IconButton
                    aria-label="more"
                    aria-controls="question-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, index)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="question-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl) && menuQuestionIndex === index}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={(event) => handleToggleRead(event, index)}
                    >
                      {question.read ? "Mark as unread" : "Mark as read"}
                    </MenuItem>
                    <MenuItem
                      onClick={(event) => handleRemoveQuestion(event, index)}
                    >
                      Remove
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <p className={`qasked${question.read ? " read" : ""}`}>
              {question.question}
            </p>
            <span
              className="view-transcript-text"
              onClick={() => handleViewTranscript(index)}
            >
              View Transcript
            </span>
            {showTranscripts[index] && (
              <p className="transcript-text">Transcript Lines...</p>
            )}
          </div>
        ));

      // Placeholder for data for After-Report content
      // Represents the amount of  questions asked during that particular slide. 
      case 1:

      return (
        <div className="Chart">
          <div className ="Date">Current Lecture Date: {new Date().toLocaleDateString()}</div>
          <BarGraph data={data} />
        </div>
      );
      
        case 2:
          return (
            <div>
              <label htmlFor="lecture-date-picker">Select a date:</label> 
              <input
                type="date"
                id="lecture-date-picker"
                value={selectedDate || ""}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
             {selectedDate && <BarGraph data={randomizeUV(data)} />}           
            </div>
          );
      default:
        return null;
    }
  };

  // Reuse the layout from StudentView and modify it to include the tab navigation and live feed
  if (!loading) {
    return (
      <div className="teacher-view">
        <Header props="Read-The-Room" />
        <div className="main-container">
          <div className="logo-bar">
            <img
              src={northeasternLogo}
              alt="Northeastern Logo"
              className="northeastern-logo"
            />
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-user-circle" aria-hidden="true"></i>
              </span>
              <br />
              <span>Account</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-tachometer" aria-hidden="true"></i>
              </span>
              <br />
              <span>Dashboard</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-users" aria-hidden="true"></i>
              </span>
              <br />
              <span>Groups</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-calendar" aria-hidden="true"></i>
              </span>
              <br />
              <span>Calendar</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-inbox" aria-hidden="true"></i>
              </span>
              <br />
              <span>Inbox</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-history" aria-hidden="true"></i>
              </span>
              <br />
              <span>History</span>
            </div>
            <div className="logo-bar-item">
              <span>
                <i className="fa fa-question-circle" aria-hidden="true"></i>
              </span>
              <br />
              <span>Help</span>
            </div>
            <div onClick={handleLogout} className="logo-bar-item">
    <span><i className="fa fa-sign-out" aria-hidden="true"></i></span><br />
            <span>Logout</span>
  </div>
          </div>
          <div className="sidebar">
            <div
              className={
                selectedNavItem === "Home" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Home")}
            >
              Home
            </div>
            <div
              className={
                selectedNavItem === "Syllabus" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Syllabus")}
            >
              Syllabus
            </div>
            <div
              className={
                selectedNavItem === "Office Hours"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setSelectedNavItem("Office Hours")}
            >
              Office Hours
            </div>
            <div
              className={
                selectedNavItem === "Announcements"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setSelectedNavItem("Announcements")}
            >
              Announcements
            </div>
            <div
              className={
                selectedNavItem === "Assignments"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setSelectedNavItem("Assignments")}
            >
              Assignments
            </div>
            <div
              className={
                selectedNavItem === "Grades" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Grades")}
            >
              Grades
            </div>
            <div
              className={
                selectedNavItem === "Piazza" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Piazza")}
            >
              Piazza
            </div>
            <div
              className={
                selectedNavItem === "Gradescope"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setSelectedNavItem("Gradescope")}
            >
              Gradescope
            </div>
            <div
              className={
                selectedNavItem === "People" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("People")}
            >
              People
            </div>
            <div
              className={
                selectedNavItem === "Files" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Files")}
            >
              Files
            </div>
            <div
              className={
                selectedNavItem === "Quizzes" ? "nav-item active" : "nav-item"
              }
              onClick={() => setSelectedNavItem("Quizzes")}
            >
              Quizzes
            </div>
            <div
              className={
                selectedNavItem === "Read the Room"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() => setSelectedNavItem("Read the Room")}
            >
              Read the Room
            </div>
          </div>
          <div className="content">
            <h1>
            CS4992 Software Development Practicum (Spring 2023) - Professor View
            </h1>
            <ThemeProvider theme={theme}>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                sx={{
                  indicator: {
                    backgroundColor: "red",
                  },
                  "& .MuiTab-textColorPrimary": {
                    color: "black",
                  },
                }}
                centered
              >
                <Tab label="Live Feed" />
                <Tab label="After-report" />
                <Tab label="Past Lectures" />
              </Tabs>
            </ThemeProvider>

            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    );
  }
};

export default TeacherView;
