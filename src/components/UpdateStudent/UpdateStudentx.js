import React from "react";
import "./UpdateStudent.css";
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function UpdateStudent() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [score, setScore] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    function handleSubmit(e){
        e.preventDefault();
        const parsedAge = parseInt(age, 10);
        const parsedScore = parseInt(score, 10);
        if (isNaN(parsedAge) || isNaN(parsedScore)) {
            alert("Invalid age or score. Please enter valid integers.");
            return;
        }
        Axios.put('http://localhost:3001/update/'+ id, {name, surname, age: parsedAge, department, score: parsedScore}).then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }

    return(
        <div className="addStudent-container">
            <div className="addStudent">
                    <h1>Update Student</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                        <input type="text" placeholder="Surname" onChange={e => setSurname(e.target.value)} />
                        <input type="number" placeholder="Age" onChange={e => setAge(e.target.value)}/>
                        <input type="text" placeholder="Department" onChange={e => setDepartment(e.target.value)}/>
                        <input type="number" placeholder="Score" onChange={e => setScore(e.target.value)}/>
                        <button type="submit">Update</button>
                    </form>
            </div>    
        </div>
        
    )
}

export default UpdateStudent