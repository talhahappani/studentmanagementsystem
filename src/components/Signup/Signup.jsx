import { useState } from "react";
import "./Signup.css";
import Axios from 'axios';


const Signup = () => {

    Axios.defaults.withCredentials = true;
    const register = () => {
        if (passwordReg !== confirmPassword) {
            window.alert("Passwords do not match");
            return;
        }

        Axios.post('http://localhost:3001/register', { user: usernameReg, password: passwordReg, userType: userType }, { timeout: 10000 })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });

    }

    const[usernameReg, setUserNameReg] = useState('');
    const[passwordReg, setPasswordReg] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const[userType, setUserType] = useState('Student');


    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form action="">
                <input type="text" placeholder="Username" onChange={(e) => {setUserNameReg(e.target.value);}}/>
                <input type="password" placeholder="Password" onChange={(e) => {setPasswordReg(e.target.value);}}/>
                <input type="password" placeholder="Confirm Password" onChange={(e) => {setConfirmPassword(e.target.value);}}/>
                <div className="buttons">
                    <input type="radio" name="user" id="student" value="student" checked={userType === 'student'} onChange={() => setUserType('student')}/>
                    <label htmlFor="student">Student</label>
                    <input type="radio" name="user" id="teacher" value="teacher" checked={userType === 'teacher'} onChange={() => setUserType('teacher')} />
                    <label htmlFor="teacher">Teacher</label>
                </div>
                <button type="button" onClick={register}>Signup</button>
            </form>
        </div>    
        )
}

export default Signup