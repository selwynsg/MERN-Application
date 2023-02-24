import React, { useState } from 'react';
import "./FindOfficial.css";
import "./gen.css"
function FindOfficial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

   const handleSearchSubmit = async (event) => {
    event.preventDefault();
    // Perform search with searchTerm
   await fetch(`http://localhost:28017/sub/Player/${searchTerm}`)
     .then((response) => response.json())
     .then((data) => setSearchResults(data))
      .catch((error) => console.log(error));
     console.log(searchResults);
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
        <ul>{searchResults.Player} </ul>
        <ul>Born: {searchResults.born}</ul>
        <ul>College: {searchResults.collage}</ul>
        <ul>Height: {searchResults.height}</ul>
        <ul>Weight: {searchResults.weight}</ul>
      </div>
    </div>
  );
}

export default FindOfficial;