import "./Signup.css";


const Signup = () => {
    return (
        <div className="signup">
            <h1>Sign Up</h1>
            <form action="">
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password"/>
                <div className="buttons">
                    <input type="radio" name="user" id="student" value="student" />
                    <label htmlFor="student">Student</label>
                    <input type="radio" name="user" id="teacher" value="teacher" />
                    <label htmlFor="teacher">Teacher</label>
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>    
        )
}

export default Signup