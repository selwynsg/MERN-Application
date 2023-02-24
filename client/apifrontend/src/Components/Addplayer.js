import React, { useState } from 'react';

function AddPlayer({ onFormSubmit }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, height, age };
    onFormSubmit(data);
      const body = JSON.stringify({
          name,
          height,
          age
      });
      

      fetch("http://localhost:28017/sub/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setShowForm(false);
      })
      .catch(error => {
        console.error(error);
        
      });

  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>Add A Player To The Database!</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <br />
          <label>
            Height:
            <input type="text" value={height} onChange={(event) => setHeight(event.target.value)} />
          </label>
          <br />
          <label>
            Age:
            <input type="text" value={age} onChange={(event) => setAge(event.target.value)} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AddPlayer;
