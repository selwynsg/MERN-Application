import React, { useState } from 'react';
import "./gen.css"
import "./FindOfficial.css";
function FindUnOfficial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   const handleSearchSubmit = async (event) => {
    event.preventDefault();
    // Perform search with searchTerm
   await fetch(`http://localhost:28017/sub/name/${searchTerm}`)
     .then((response) => response.json())
     .then((data) => setSearchResults(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" className = "input" name="name" id="name" value={searchTerm} onChange={handleSearchChange} />
        <div>
          <button className = "btn" type="submit">Search</button>
          </div>
      </form>
      <div className='container'>
        <ul>Name: {searchResults.name}</ul>
        <ul>Height: {searchResults.height}</ul>
        <ul>Age: {searchResults.age}</ul>
      </div>
    </div>
  );
}

export default FindUnOfficial;