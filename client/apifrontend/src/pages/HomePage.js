import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropbox from '../Components/Dropbox';
import AddPlayer from '../Components/Addplayer';
import FindOfficial from '../Components/FindOfficial';
import FindUnOfficial from '../Components/FindUnOfficial';
import FindCollege from '../Components/FindCollege';
import FindWeight from '../Components/FindWeight';
import "./HomePage.css"

function HomePage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);
  const [formData, setFormData] = useState([]);

  const handleFormSubmit = (data) => {
    setFormData([...formData, data]);
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

  const handlePlayer = () => {
    setShowPlayers(!showPlayers);
    if (!showPlayers) {
      // Make API call to retrieve data and set it to the players state
      fetch('http://localhost:28017/sub/')
        .then((response) => response.json())
        .then((data) => setPlayers(data));
    } else {
      setPlayers([]);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='main'>
      <h1>Welcome to the Basketball Player Database!</h1>
      <div>
        <button onClick={handlePlayer}>{showPlayers ? 'Hide Players' : 'See All Players'}</button> 
        {showPlayers && (
          <ul>
            {players.map((player) => (
              <Dropbox key={player._id} props = {player.Player} ></Dropbox>
            ))}
          </ul>
        )}
      </div>
      <div>
        <AddPlayer onFormSubmit={handleFormSubmit} />
      </div>
      <div>
        <h3> Search for details of an Official Basketball player! These are verified Players!</h3>
        <FindOfficial />
      </div>
      <div>
        <h3>Search for details of community added players!</h3>
        <FindUnOfficial />
      </div>
      <div>
        <h3>Search for players from the same college!</h3>
        <FindCollege />
      </div>
      <div>
        <h3>Search for players in the same weight class!</h3>
        <FindWeight />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomePage;
