import React, { useEffect, useState } from "react";
import powerpoint from "../views/powerpoint.png";
import ProfileIcon from "./ProfileIcon";
import "./Modal.css";

const Modal = ({ isOpen, onRequestClose, activeItem, data }) => {
  const [questions, setQuestions] = useState([]);
  const [showTranscripts, setShowTranscripts] = useState([]);
  const [showMoreTranscript, setShowMoreTranscript] = useState(false);

  const handleViewMoreClick = () => {
    setShowMoreTranscript(!showMoreTranscript);
  };
  useEffect(() => {
    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);

  async function fetchQuestions() {
    try {
      const response = await fetch("http://localhost:28017/questions/");
      const fetchedQuestions = await response.json();
      setQuestions(shuffleArray(fetchedQuestions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  const handleViewTranscript = (index) => {
    setShowTranscripts((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (!isOpen) {
    return null;
  }

  const numberOfQuestions = Math.floor(data / 100);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return (
    <div className="modal-overlay" onClick={onRequestClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onRequestClose}>
        </button>
        <div className="modal-top-section">
          <img
            className="modal-image"
            src={powerpoint}
            alt="Modal"
            style={{ width: "500px", height: "300px" }}
          />
          <div className="modal-text">
            <h2>Transcript</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
              placerat libero. Etiam lacinia sollicitudin sapien.
            </p>
            <span className="view-more-text" onClick={handleViewMoreClick}>
          View More
        </span>
        {showMoreTranscript && <p>more transcript</p>}
          </div>
        </div>
        <div className="modal-bottom-section">
          <p className="slide-heading">
            {numberOfQuestions} Questions from {activeItem.name}
          </p>
          {questions.slice(0, numberOfQuestions).map((question, index) => (
            <div key={index} className="question-box">
              <div className="student-question-info">
                <ProfileIcon />
                <div className="question-details">
                  <h4>
                    {question.studentName || "Anonymous"}{" "}
                    {new Date(question.timestamp).toLocaleTimeString()}
                  </h4>
                </div>
              </div>
              <strong className="questionasked">{question.question}</strong>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
