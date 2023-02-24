import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


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
        navigate('/homePage');
      }
    };
    checkAuthentication();
  }, [navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
   const response = await fetch('http://localhost:28017/info/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
   });
    console.log(response);
  if (response.ok) {
    navigate('/homePage');
  } else {
    setError('Invalid email or password');
  }
  };
  


  return (
    <div class="container"> 
      <div class="login">
        <h1>Login to the Database </h1>
    <form onSubmit={handleSubmit}>
      <label>
            <p>Email:</p>
            <input class="box" type="email" value={email} onChange={handleEmailChange} />
      </label>
      <label>
      <p>Password:</p>
        <input class="box" type="password" value={password} onChange={handlePasswordChange} />
      </label>
      {error && <div>{error}</div>}
          <button class="submit" type="submit">Login</button>
          <div>
          <a className="button-56" href="/register">
      Don't have an account yet? Register!
      </a>
       </div>
        </form>
        </div>
      </div>
  );
}
export default LoginPage;
