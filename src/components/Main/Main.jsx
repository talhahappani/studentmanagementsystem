import axios from "axios";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";    
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Main = ( {userType} ) => {
    axios.defaults.withCredentials = true;
    const [student, setStudent] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/").then(res => setStudent(res.data)).catch(err => console.log(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:3001/delete/'+id);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }


        return (
        <div className="d-flex vh-70 justify-content-center align-items-center">
            <div className="w-50 bg-white-rounded p-3">
            {userType === "Teacher" && <Link to="/create" className="btn btn-success">Add +</Link>}
                <table className="table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Score</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            student.map((data, i) => (
                                <tr key={i}>
                                    <td>{data.Name}</td>
                                    <td>{data.Surname}</td>
                                    <td>{data.Age}</td>
                                    <td>{data.Department}</td>
                                    <td>{data.Score}</td>
                                    <td>
                                        {userType === "Teacher" && (
                                        <>
                                            <Link to={`update/${data.id}`}><EditIcon color="secondary" sx={{ "& :hover": { opacity: "0.8" }}}/></Link>
                                            <DeleteIcon onClick={e => handleDelete(data.id)} sx={{ "& :hover": { opacity: "0.8" }, cursor: "pointer" }} />
                                        </>
                                    )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Main;