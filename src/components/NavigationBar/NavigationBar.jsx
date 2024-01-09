import "./NavigationBar.css";
import Axios from "axios";
import { Link } from 'react-router-dom';

const NavigationBar = ({auth, setAuth, userName, setUserType}) => {
    Axios.defaults.withCredentials = true;

    
    const handleLogout = () => {
        Axios.get("http://localhost:3001/logout").then(response => {
            if (response.data.Status === "Success") {
                setAuth(false);
                setUserType("");
            } else {
                console.error("Logout failed");
            }
        });
    };

    

    return (
        <nav>
            <a href="/">Student Management System</a>
            <div className="nav-div">
                {auth ? (
                    <>
                    <div>
                        <p>Welcome, <span>{userName}</span></p>
                    </div>
                    <button type="button" onClick={handleLogout} className="logout">Logout</button>
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