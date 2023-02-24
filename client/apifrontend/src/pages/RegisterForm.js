import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    console.log(email, password);
    const response = await fetch(`http://localhost:28017/info/Email/${email}`, {
      method: 'GET',
    });
    if (response.status === 404) {
      try {
        const postData = {
          Email: email,
          Password: password
        };
        const response2 = await fetch('http://localhost:28017/info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });
        navigate('/');
        console.log("hi");
      }
      catch (error) {
        setError('Failed to register');
      }
    } else {
      setError('There is an account already registered');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Register</button>
      <div>
        <a href="/"> Already have an account? Login here!</a>
      </div>
    </form>
  );
}
export default RegisterForm;