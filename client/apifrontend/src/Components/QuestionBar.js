import React, { useState } from 'react';
import "./QuestionBar.css";
import questionMarkImage from "./qm.png"
function QuestionBar() {
  const [showQuestionBox, setShowModal] = useState(false);
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Replace with your backend API endpoint
    const apiUrl = 'http://localhost:28017/questions';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, timestamp: new Date() }), // Include the timestamp
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      setQuestion('');
      alert('Question submitted successfully.');
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting question:', error);
    }
    };
    

  return (
    <div className="question-bar">
    <button onClick={() => setShowModal(!showQuestionBox)}>
      <img src={questionMarkImage} alt="Question Mark" />
    </button>
      {showQuestionBox && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
          <button type="submit">Ask</button>
        </form>
      )}
    </div>
  );
}

export default QuestionBar;

