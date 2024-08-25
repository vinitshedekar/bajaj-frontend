import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const jsonData = JSON.parse(input);
      const result = await axios.post('https://bfhl5.netlify.app/', jsonData);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON format.');
    }
  };

  const handleSelectChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedOptions(selected);
  };

  return (
    <div>
      <h1>21BPS1259</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON: {"data": ["A", "C", "z"]}'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <select multiple onChange={handleSelectChange}>
        <option value="alphabets">Alphabets</option>
        <option value="numbers">Numbers</option>
        <option value="highest_lowercase">Highest Lowercase Alphabet</option>
      </select>
      {response && (
        <div>
          <h2>Response</h2>
          {selectedOptions.includes('alphabets') && (
            <div>
              <h3>Alphabets</h3>
              <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
            </div>
          )}
          {selectedOptions.includes('numbers') && (
            <div>
              <h3>Numbers</h3>
              <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
            </div>
          )}
          {selectedOptions.includes('highest_lowercase') && (
            <div>
              <h3>Highest Lowercase Alphabet</h3>
              <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
