import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import LoginSignupContainer from './components/LoginSignupContainer/LoginSignupContainer';
import Main from './components/Main/Main';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

    Axios.get("http://localhost:3001/login").then(response => {
      if(response.data.loggedIn == true) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });


  return (        
  <BrowserRouter>
    <div className="App">
      <NavigationBar />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginSignupContainer />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
