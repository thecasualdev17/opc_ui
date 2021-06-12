import React, {useState, useEffect, useCallback} from "react";
import axios from "axios"
import DownloadLink from "react-download-link";
import './App.css';

function App() {
  
  const [link, setLink] = useState('');
  const [alphabeticalStringsCount, setAlphabeticalStringsCount] = useState(0);
  const [realNumbersCount, setRealNumbersCount] = useState(0);
  const [integersCount, setIntegersCount] = useState(0);
  const [alphanumericsCount, setAlphanumericsCount] = useState(0);
  
  const [printableRandomObjects, setprintableRandomObjects] = useState({
    generatedString: "",
    alphabeticalStringsCount: 0,
    realNumbersCount: 0,
    integersCount: 0,
    alphanumericsCount: 0
  });

  useEffect(() => {
    document.title = "Omnilytics Programming Challenge - UI"
  }, []);

  const [isRequestPending, setIsRequestPending] = useState(false)
  const sendRequest = useCallback(async () => {
    setLink("")
    if (isRequestPending) return
    setIsRequestPending(true)
    await axios(
      process.env.REACT_APP_API_URL+'/generateMultiPartRandomObject',
    ).then((res)=>{
      setprintableRandomObjects(res.data);
      makeFile(res.data.generatedString);
    });
    
    setIsRequestPending(false)
  }, [isRequestPending]);
  
  const createReport = function(){
    setAlphabeticalStringsCount(printableRandomObjects.alphabeticalStringsCount);
    setRealNumbersCount(printableRandomObjects.realNumbersCount);
    setIntegersCount(printableRandomObjects.integersCount);
    setAlphanumericsCount(printableRandomObjects.alphanumericsCount);
  }

  const makeFile = function(dataString){
    const data = new Blob([dataString], { type: 'text/plain' })
    if (link !== '') window.URL.revokeObjectURL(link)
    setLink(window.URL.createObjectURL(data))
  }

  return (
    <div className="app">
      <div className="contentWrapper">
        <button className="btn" disabled={isRequestPending} onClick={sendRequest}>
            Generate
        </button>
        <p>Link:&ensp;
        <DownloadLink
            className="appLink"
            disabled={isRequestPending}
            label={link}
            filename="Omnilytics Programming Challenge File"
            exportFile={() => Promise.resolve(printableRandomObjects.generatedString)}
        />
        </p>
        <button className="btn" onClick={createReport}>
          Report
        </button>
        <p>Alphabetical String: {alphabeticalStringsCount}</p>
        <p>Real Numbers: {realNumbersCount}</p>
        <p>Integers: {integersCount}</p>
        <p>Alphanumerics: {alphanumericsCount}</p>
      </div>
    </div>
  );
}

export default App;
