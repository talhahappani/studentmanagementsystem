import "./LoginSignupContainer.css"
import { useState, useRef } from "react"
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const LoginSignupContainer = ({auth, setAuth}) => {
    const [login, setLogin] = useState(true);

    const loginSignupContainerRef = useRef(null);

    const handleClick = () => {
        setLogin(!login);

        loginSignupContainerRef.current.classList.toggle("active");
    }
    return(
        <div className="login-signup-container" ref={loginSignupContainerRef}>
            { <Login auth={auth} setAuth={setAuth}/>}
            <div className="side-div">
                <button type="button" onClick={handleClick}>{login ? "Signup" : "Login"}</button>
            </div>
            { <Signup />}
        </div>
    )
}

export default LoginSignupContainer