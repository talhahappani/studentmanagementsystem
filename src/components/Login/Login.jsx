import { useEffect, useState } from "react";
import "./Login.css";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";



const Login = ( ) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;


    const login = () => {
        Axios.post("http://localhost:3001/login", {
            user: username,
            password: password
        })
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((error) => {
            window.alert(error.response.data.message);
        });
    }
    
    useEffect(() => {
        Axios.get("http://localhost:3001/login").then(response => {
            console.log(response.data.loggedIn);
            if(response.data.loggedIn == true){
                setLoginStatus(response.data.user[0].username);
            }
        })
    }, [loginStatus]);
    return (
        <div className="login">
            <h1>Login</h1>
            <form action="">
                <input type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value);}} />
                <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value);}}/>
                <button type="button" onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login