import "./App.css"
import { useState } from 'react';

function App() {
  const [charId, setCharId] = useState('');
  const [charName, setCharName] = useState('');

  const fetchChar = (id: string) => {
    fetch('https://swapi.dev/api/people/' + id)
    .then(data => data.json())
    .then(data => {
      const name = data.name;
      setCharName(name);
      const key = 'name ' + id;
      chrome.storage.sync.set({
        key: name
      }, () => {})
    })
    .catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="App">
      Hello World
      <div>
      <input onChange={(e) => setCharId(e.target.value)}></input>
      <button onClick={() => fetchChar(charId)}>fetch name</button>
      {charName}
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default App;
