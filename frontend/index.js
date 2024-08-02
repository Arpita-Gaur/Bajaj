// pages/index.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = JSON.parse(input);
      const response = await axios.post('/api/bfhl', data);
      setResponse(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedOptions);
  };

  return (
    <div>
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter JSON input"
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <select multiple value={selectedOptions} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>
          {selectedOptions.includes('alphabets') && (
            <div>
              <h2>Alphabets</h2>
              <ul>
                {response.alphabets.map((alphabet) => (
                  <li key={alphabet}>{alphabet}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.includes('numbers') && (
            <div>
              <h2>Numbers</h2>
              <ul>
                {response.numbers.map((number) => (
                  <li key={number}>{number}</li>
                ))}
              </ul>
            </div>
          )}
          {selectedOptions.includes('highest_alphabet') && (
            <div>
              <h2>Highest Alphabet</h2>
              <p>{response.highest_alphabet[0]}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;