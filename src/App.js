import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  
  const [link, setLink] = useState('some link asdasd');
  const [printableRandomObjects, setprintableRandomObjects] = useState({});

  useEffect(() => {
    document.title = "Omnilytics Programming Challenge - UI"
  }, []);

  return (
    <div className="app">
      <div className="contentWrapper">
        <button onClick={() => alert('test')}>
            Generate
        </button>
        <p>Link: <span className="appLink">{link}</span></p>
        <button onClick={() => alert('test')}>
          Report
        </button>
        <p>Alphabetical String: {printableRandomObjects.AlphabeticalString}</p>
        <p>Real Numbers: {printableRandomObjects.RealNumbers}</p>
        <p>Integers: {printableRandomObjects.Integers}</p>
        <p>Alphanumerics: {printableRandomObjects.Alphanumerics}</p>
      </div>
    </div>
  );
}

export default App;
