import { useCallback, useEffect, useState } from "react";
import "./Login.css";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";



const Login = ({auth, setAuth}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;


    const login = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/login", {
            user: username,
            password: password
        })
        .then((response) => {
            console.log(response);
            setAuth(true);
            navigate("/");
        })
        .catch((error) => {
            window.alert(error.response.data.message);
        });
    }
    

    // useEffect(() => {
    //   Axios.get("http://localhost:3001").then((res) => {
    //     if (res.data.Status === "Success") {
    //       setAuth(true);
    //     } else {
    //       setMessage(res.data.Message);
    //       setAuth(false);
    //     }
    //   });
    // }, [setAuth]);
    
    return (
        <div className="login">
            <h1>Login</h1>
            {
                !auth ?
                    <form onSubmit={login}>
                    <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value);}} />
                    <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}}/>
                    <button type="submit">Login</button>
                </form>
                :
                <h2>You are alreaddy logged in.</h2>
            } 
        </div>
    )
}

export default Login