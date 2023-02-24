import React, { useState, useEffect } from 'react';


function FindWeight() {
  const [weight, setWeight] = useState('');
  const [players, setPlayers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setExpanded(true);
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`http://localhost:28017/sub/weight/${weight}`);
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (expanded && weight !== '') {
      fetchPlayers();
    }
  }, [weight, expanded]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="players-by-weight">
      <form onSubmit={handleSearchSubmit}>
        <input type="text" className="input" name="weight" id="college" value={weight} onChange={handleSearchChange} />
        <button className="btn" type="submit">Search</button>
      </form>
      {expanded && (
        <>
          <button onClick={handleToggle}>{expanded ? 'show less' : '+'}</button>
          <ul>
            {players.map((player) => (
              <ul key={player._id}>
                {player.Player}
              </ul>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default FindWeight;
