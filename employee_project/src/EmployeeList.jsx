import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'react-use';
import mywaveLogo from './assets/mywave_logo.png';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // 500ms after searchTerm stops changing
    useDebounce(
        () => {
            setDebouncedSearch(searchTerm);
        },
        500,
        [searchTerm]
    );

    // Fetch all or searched employees 
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                if (debouncedSearch.trim() === '') {
                    const res = await axios.get('http://localhost:8080/get_employee.php');
                    setEmployees(res.data);
                } else {
                    const res = await axios.get(`http://localhost:8080/search_employee.php?q=${encodeURIComponent(debouncedSearch)}`);
                    setEmployees(res.data);
                }
            } catch (err) {
                console.error('Error loading employees', err);
            }
        };

        fetchEmployees();
    }, [debouncedSearch]);

    // Initial load
    useEffect(() => {

        if (!searchTerm) {
            axios.get('http://localhost:8080/get_employee.php')
                .then(res => setEmployees(res.data))
                .catch(err => console.error(err));
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <img src={mywaveLogo} alt="MYwave Logo" className="h-10 w-auto" />
                <input
                    type="text"
                    placeholder="Search by name, email, or department"
                    className="p-2 border rounded w-full max-w-sm ml-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <h2 className="text-xl font-semibold mb-4">Employee Profiles</h2>

            {employees.length > 0 ? (
                employees.map((emp, index) => (
                    <div key={index} className="bg-transparent dark:bg-gray-800 p-4 rounded shadow mb-4">
                        <h4 className="font-bold text-lg">{emp.name}</h4>
                        <p className="text-sm text-white-200">{emp.email} | {emp.phone}</p>
                        <p className="text-sm text-white-200">{emp.department}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No employees found.</p>
            )}
        </div>
    );
};

export default EmployeeList;