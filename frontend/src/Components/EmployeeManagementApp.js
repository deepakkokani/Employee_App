import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import bgImage from './bg.jpg';


const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null)
    const [employeesData, setEmployeesData] = useState({
        employees: [],
        pagination: {
            currentPage: 1,
            pageSize: 5,
            totalEmployees: 0,
            totalPages: 0
        }
    });

    const fetchEmployees = async (search = '', page = 1, limit = 5) => {
        console.log('Called fetchEmployees')
        try {
            const data =
                await GetAllEmployees(search, page, limit);
            console.log(data);
            setEmployeesData(data);
        } catch (err) {
            alert('Error', err);
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, [])


    const handleSearch = (e) => {
        fetchEmployees(e.target.value)
    }

    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    }
    return (
        <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3 ' 
        style={{ 
            backgroundImage: `url(${bgImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <div 
                style={{ 
                    display: 'inline-block', 
                    padding: '20px 30px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    border: '1px solid #ddd', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '8px', 
                    textAlign: 'center', 
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}
            >
                <h1 style={{ margin: 0 }}>Employee Management App</h1>
            </div>
            <br />
            <div className='w-100 d-flex justify-content-center'>
                <div className='w-80 border bg-light p-3' style={{ width: '80%' }}>
                    <div className='d-flex justify-content-between mb-3'>
                        <button className='btn btn-primary'
                            onClick={() => setShowModal(true)}>Add</button>
                        <input
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Employees..."
                            className='form-control w-50'
                        />
                    </div>
                    <EmployeeTable
                        employees={employeesData.employees}
                        pagination={employeesData.pagination}
                        fetchEmployees={fetchEmployees}
                        handleUpdateEmployee={handleUpdateEmployee}
                    />

                    <AddEmployee
                        fetchEmployees={fetchEmployees}
                        showModal={showModal}
                        setShowModal={setShowModal}
                        employeeObj={employeeObj}
                    />
                </div>
            </div>
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
};

export default EmployeeManagementApp;