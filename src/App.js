import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import LoginSignupContainer from './components/LoginSignupContainer/LoginSignupContainer';
import Main from './components/Main/Main';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  //   Axios.get("http://localhost:3001/login").then(response => {
  //     if(response.data.loggedIn == true) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false);
  //     }

  //   });

    const [auth, setAuth] = useState(false);
    Axios.defaults.withCredentials = true;
    useEffect(() => {
      console.log("1");
      Axios.get('http://localhost:3001/auth').then(res => {
        console.log(res);
          if(res.data.Status === "Success"){
              setAuth(true);
          } else {
              setAuth(false);
          }
      })
  }, []);

  // console.log(auth);

  return (        
  <BrowserRouter>
    <div className="App">
      <NavigationBar auth={auth} setAuth={setAuth} />
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginSignupContainer auth={auth} setAuth={setAuth} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
