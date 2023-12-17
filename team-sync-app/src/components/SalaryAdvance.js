import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SalaryAdvance = () => {
    const apiEndPoint = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    let [employeeList,setemployeeList] = useState([])

    useEffect(()=>{
        getEmployeeList();
    },[])
   
    const getEmployeeList = async () => { 
        try {
            const result = await axios.get(apiEndPoint + 'GetAllEmployee'); 
            setemployeeList(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
             <div className='row'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            Salary Advance
                        </div>
                        <div className='card-body'>

                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-success'>
                            Form
                        </div>
                        <div className='card-body'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryAdvance;