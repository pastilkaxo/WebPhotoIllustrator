import React from 'react'
import "./Styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
}
  from 'react-router-dom';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import Test from './Components/Main/Test';

interface ResponseData {
  message: string;
  status: string;
}

export default function App() {
  const [state, setState] = React.useState<ResponseData | null>(null) 
  
  const callbackAPI = async () : Promise< ResponseData| null> => { 
    try {
      const response = await fetch("/api/database/create");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else {
        const body = await response.json();
        return body;
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  React.useEffect(() => {
    callbackAPI().then(data => setState(data));
  }, []);

  return (
      <Router>
      <Header  />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Main db={ state } />} />
          <Route path="/about" element={<Test />} />
          <Route path="/contact" element={<div className='main'>Contact Page</div>} />
        </Routes>
      </main>
      </Router>
  )
}
