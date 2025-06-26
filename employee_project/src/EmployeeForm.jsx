import { useState, useEffect } from 'react';
import { Send } from "lucide-react"
import mywaveLogo from './assets/mywave_logo.png';

import axios from 'axios';

const EmployeeForm = () => {


    const [employeeData, setEmployeeData] = useState({
        employeeName: '',
        gender: '',
        martialStatus: '',
        phoneNo: '',
        email: '',
        address: '',
        dateOfBirth: '',
        nationality: '',
        hireDate: '',
        department: '',

    });
    useEffect(() => {


        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");


    }, [])

    const [message, setMessage] = useState('')

    const handleInput = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/add_employee.php', employeeData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error submitting data');

        }
    }


    return (
        <div>
            <img src={mywaveLogo} alt="MYwave Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-semibold mb-4">Employee Form</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
                <div>
                    <label className="block mb-1 text-sm text-white text-left">Name</label>
                    <input type="text" name="employeeName" placeholder="Your Name" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Gender</label>
                    <select name="gender" required onChange={handleInput} className="p-2 rounded border w-full border-border bg-background text-foreground dark:bg-card dark:text-white">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Marital Status</label>
                    <select name="martialStatus" required onChange={handleInput} className="p-2 rounded border w-full border-border bg-background text-foreground dark:bg-card dark:text-white">
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Phone Number</label>
                    <input type="text" name="phoneNo" placeholder="012-34567890" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Email</label>
                    <input type="email" name="email" placeholder="Email" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Address</label>
                    <input type="text" name="address" placeholder="Address" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Date of Birth</label>
                    <input type="date" name="dateOfBirth" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Nationality</label>
                    <input type="text" name="nationality" placeholder="Nationality" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Hire Date</label>
                    <input type="date" name="hireDate" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <div>
                    <label className="block mb-1 text-sm text-white text-left">Department</label>
                    <input name="department" placeholder="Department" required onChange={handleInput} className="p-2 border rounded text-white w-full" />
                </div>

                <button type="submit" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <Send size={16} />
                    Add Employee
                </button>

                <p className="text-white">{message}</p>
            </form>
        </div>



    )
}
export default EmployeeForm