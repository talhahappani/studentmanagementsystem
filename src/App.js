import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import LoginSignupContainer from './components/LoginSignupContainer/LoginSignupContainer';
import Main from './components/Main/Main';
import CreateStudent from './components/CreateStudent/CreateStudent';
import UpdateStudent from './components/UpdateStudent/UpdateStudentx';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';

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
    const [userType, setUserType] = useState("");
    Axios.defaults.withCredentials = true;
    useEffect(() => {
      console.log("1");
      Axios.get('http://localhost:3001/auth').then(res => {
        console.log(res);
          if(res.data.Status === "Success"){
              setUserType(res.data.name.userType);
              setAuth(true);
          } else {
              setAuth(false);
          }
      })
  }, []);

  console.log(userType);

  return (        
  <BrowserRouter>
    <div className="App">
      <NavigationBar auth={auth} setAuth={setAuth} />
      <Routes>
      <Route path="/" element={<Main userType={userType} />} />
      <Route path="/login" element={<LoginSignupContainer auth={auth} setAuth={setAuth} />} />
      <Route element={<ProtectedRoute userType={userType} allowedUserTypes={["Teacher"]}/>}>
        <Route element={<CreateStudent/>} path="/create" exact/>
        <Route element={<UpdateStudent />} path='update/:id' exact />
      </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
