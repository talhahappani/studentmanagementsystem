import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <nav>
            <a href="/">Student Management System</a>
            <div className="nav-div">
                <p>Welcome, <span>Guest</span></p>
                <i className="fas fa-user"></i>
            </div>
        </nav>
    )
}

export default NavigationBar