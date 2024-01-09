import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar';
import LoginSignupContainer from './components/LoginSignupContainer/LoginSignupContainer';
import Main from './components/Main/Main';
import CreateStudent from './components/CreateStudent/CreateStudent';
import UpdateStudent from './components/UpdateStudent/UpdateStudentx';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Routes, Switch, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';

function App() {

    const [auth, setAuth] = useState(false);
    const [userType, setUserType] = useState("");
    const [userName, setUsername] = useState("");
    Axios.defaults.withCredentials = true;
    useEffect(() => {
      Axios.get('http://localhost:3001/auth').then(res => {
        // console.log(res);
          if(res.data.Status === "Success"){
              setUserType(res.data.name.userType);
              setUsername(res.data.name.user);
              setAuth(true);
          } else {
              setAuth(false);
          }
      })
  }, [auth, userType]);

  // console.log(userName);

  return (        
  <BrowserRouter>
    <div className="App">
      <NavigationBar auth={auth} setAuth={setAuth} userName={userName} setUserType = {setUserType}/>
      <Routes>
      <Route path="/" element={<Main userType={userType} auth={auth} />} />
      <Route path="/login" element={<LoginSignupContainer auth={auth} setAuth={setAuth} />} />
      <Route element={<ProtectedRoute userType={userType} allowedUserTypes={["Teacher"]}/>}>
        <Route element={<CreateStudent/>} path="/create" exact/>
        <Route element={<UpdateStudent />} path='update/:id' exact />
        <Route path="/delete/:id" element={<Navigate to="/" replace />} />
      </Route>
      <Route element={<ProtectedRoute userType={userType} allowedUserTypes={["Teacher", "Student"]}/>}>
        <Route path="/filter" element={<Navigate to="/" replace />} />
      </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
