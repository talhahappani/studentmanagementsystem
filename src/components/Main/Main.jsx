import axios from "axios";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

const Main = () => {
    // Axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3001/").then(res => console.log(res)).catch(err => console.log(err));
    })
        return (
        <div className="d-flex vh-70 justify-content-center align-items-center">
            <div className="w-50 bg-white-rounded p-3">
                <button className="btn btn-success">Add +</button>
                <table className="table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Score</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

        </div>
    )
}

export default Main;