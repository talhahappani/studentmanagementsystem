import { useEffect, useState } from "react";
import "./NavigationBar.css";
import Axios from "axios";
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    const [loggedInUsername, setLoggedInUsername] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:3001/login")
        .then(response => {
            if (response.data.loggedIn == true) {
                setLoggedInUsername(response.data.user[0].user);
            }
        })
        .catch(error => {
            console.error("Error during Axios request:", error);
            if (error.response) {
                console.error("Server responded with status:", error.response.status);
                console.error("Server response data:", error.response.data);
            } else if (error.request) {
                console.error("No response received from the server");
            } else {
                console.error("Error setting up the request:", error.message);
            }
        });
}, []);
console.log(loggedInUsername);

    const handleLogout = () => {
        Axios.post("http://localhost:3001/logout").then(response => {
            if (response.data.success) {
                // Clear the logged-in user state
                setLoggedInUsername("");
            } else {
                console.error("Logout failed");
            }
        });
    };
    
    const handleLogin = (username) => {
        setLoggedInUsername(username);
    };

    const handleSignin = () => {
    }

    return (
        <nav>
            <a href="/">Student Management System</a>
            <div className="nav-div">
                {loggedInUsername ? (
                    <>
                    <div>
                        <p>Welcome, <span>{loggedInUsername}</span></p>
                    </div>
                    <button onClick={handleLogout} className="logout">Logout</button>
                    <i className="fas fa-user"></i>
                    </>
                ) : (
                    <>
                    <p>Welcome, <span>Guest</span></p>
                    <Link to="/login" className="login">Login</Link>
                    <i className="fas fa-user"></i>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar