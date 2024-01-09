import axios from "axios";
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";    
import { Link } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';


const Main = ( {userType, auth} ) => {
    axios.defaults.withCredentials = true;
    const [student, setStudent] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/").then(res => setStudent(res.data)).catch(err => console.log(err));
    }, [auth, userType]);

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState({
        name: '',
        surname: '',
        age: '',
        department: '',
        score: '',
    });

    const toggleFilterDrawer = () => {
        setIsFilterDrawerOpen(!isFilterDrawerOpen);
    };


    const handleFilter = async () => {
        try {
        const response = await axios.post('http://localhost:3001/filter', filterCriteria);
        setStudent(response.data);
        } catch (error) {
        console.error('Filtering error:', error);
        }
    };

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
                <div className="buttons">
                {userType === "Teacher" && <Link to="/create"><Button variant="contained" style={{backgroundColor: '#163020'}}>Add +</Button></Link>}
                {(userType === "Teacher" || userType === "Student") && (
                    <>
                     <Button variant="contained" style={{backgroundColor: '#163020'}} onClick={toggleFilterDrawer}>
                        Filter
                    </Button>
                    <Drawer anchor="right" open={isFilterDrawerOpen} onClose={toggleFilterDrawer}>
                        <div className="filter-drawer">
                        <TextField
                            label="Name"
                            variant="standard"
                            value={filterCriteria.name}
                            onChange={(e) => setFilterCriteria({ ...filterCriteria, name: e.target.value })}
                        />
                        <TextField
                            label="Surname"
                            variant="standard"
                            margin="normal"
                            value={filterCriteria.surname}
                            onChange={(e) => setFilterCriteria({ ...filterCriteria, surname: e.target.value })}
                        />
                        <TextField
                            label="Age"
                            margin="normal"
                            variant="standard"
                            value={filterCriteria.age}
                            onChange={(e) => setFilterCriteria({ ...filterCriteria, age: e.target.value })}
                        />
                        <TextField
                            label="Department"
                            margin="normal"
                            variant="standard"
                            value={filterCriteria.department}
                            onChange={(e) => setFilterCriteria({ ...filterCriteria, department: e.target.value })}
                        />
                        <TextField
                            label="Score"
                            variant="standard"
                            margin="normal"
                            value={filterCriteria.score}
                            onChange={(e) => setFilterCriteria({ ...filterCriteria, score: e.target.value })}
                        />
                        <Button variant="contained" style={{backgroundColor: '#163020'}} onClick={handleFilter}>
                            Apply Filters
                        </Button>
                        </div>
                    </Drawer>
                    </>
                )}
                </div>
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
                                            <Link to={`update/${data.id}`}><EditIcon  sx={{ "& :hover": { opacity: "0.8" }, color: '#163020'}}/></Link>
                                            <DeleteIcon onClick={e => handleDelete(data.id)} sx={{ "& :hover": { opacity: "0.8", color: '#8B0000' }, cursor: "pointer" }} />
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