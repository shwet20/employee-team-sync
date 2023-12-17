import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SalaryAdvance = () => {
    const apiEndPoint = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    let [employeeList,setemployeeList] = useState([]);
    const [allAdvance, setAllAdvance] = useState();
    const [advanceObj, setAdvanceObj] = useState({
        "advanceId": 0,
        "employeeId": 0,
        "advanceDate": "",
        "advanceAmount": 0,
        "reason": ""
    })
    console.log(new Date())

    useEffect(()=>{
        getEmployeeList();
        getAllAdvance();
    },[])
   
    const getEmployeeList = async () => { 
        try {
            const result = await axios.get(apiEndPoint + 'GetAllEmployee'); 
            setemployeeList(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllAdvance = async()=>{
        try {
            const result = await axios.get(apiEndPoint + 'GetAllAdvance'); 
            setAllAdvance(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    
    const getAdvancebyEmployeeId= async(id)=>{
        try {
            const result = await axios.get(apiEndPoint + "GetAllAdvanceByEmpId?empid=" + id);
            // setEmployeeObj(result.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const changeFormValue = (event, key)=>{
        setAdvanceObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const saveAdvance = async () => { 
        try {
            const result = await axios.post(apiEndPoint + "AddAdvance", advanceObj);
            if (result.data.result) {
                alert('attendance Created');
                getAllAdvance();
            } else {
                alert(result.data.message)
            }
        } catch (error) { 
            console.log(error)
        }
        setAdvanceObj({
            "advanceId": 0,
            "employeeId": 0,
            "advanceDate": "",
            "advanceAmount": 0,
            "reason": ""
    })   
    }

    const onEditAdvance = async (item) => {
        setAdvanceObj({
            "advanceId": item.advanceId,
            "employeeId": item.employeeId,
            "advanceDate": item.advanceDate,
            "advanceAmount": item.advanceAmount,
            "reason": item.reason
    })
          };

          const onUpdateAdvance =async()=> {
            try {
                const result = await axios.post(apiEndPoint + "UpdateAdvance",advanceObj);
                if (result.data.result) {
                  alert("Advance Updated");
                  getAllAdvance();
                } else {
                  alert(result.data.message);
                }
              } catch (error) {
                console.log(error);
              }
              setAdvanceObj({
                "advanceId": 0,
                "employeeId": 0,
                "advanceDate": "",
                "advanceAmount": 0,
                "reason": ""
        })   
        }

        const onDeleteAdvance =async(id)=>{
            const isDelte = window.confirm("Are You Sure want to Delete");
            if (isDelte) {
              try {
                const result = await axios.get(apiEndPoint + "DeleteAdvanceById?advanceid=" + id);
                if (result.data.result) {
                  alert("Advance Deleted");
                  getAllAdvance();
                } else {
                  alert(result.data.message);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }

          const onReset =()=>{
            setAdvanceObj({
                "advanceId": 0,
                "employeeId": 0,
                "advanceDate": "",
                "advanceAmount": 0,
                "reason": ""
        }); 
          }

    return (
        <div className="container-fluid px-3">
        <div className="row">
          <div className="col-9">
            <div className="card">
              <div className="card-header bg-success">Salary Advance List</div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Employee Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAdvance?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                         <td>{item.empName} </td>
                            <td>{item.advanceDate}</td>
                         <td>{item.advanceAmount} </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary mx-1"
                         onClick={()=>onEditAdvance(item)}
                         >
                              
                              ✒️
                            </button>
                            <button className="btn btn-sm btn-outline-danger mx-1"
                            onClick={()=>onDeleteAdvance(item.advanceId)}
                            >
                              
                              ✘
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header bg-success">Salary Advance</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <label>Employee Name</label>
                    <select
                      className="form-select"
                      value={advanceObj.employeeId}
                      onChange={(event) => {
                        changeFormValue(event, "employeeId");
                      }}
                    >
                      <option>Select Employee</option>
                      {employeeList.map((item) => {
                        return (
                          <option value={item.empId}>{item.empName}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="row mt-3">
                <div className="col-6">
                    <label>Date</label>
                    <input
                      type="date"
                      value={advanceObj.advanceDate}
                      onChange={(event) => {
                        changeFormValue(event, "advanceDate");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Advance Amount</label>
                    <input
                      type="number"
                      value={advanceObj.advanceAmount}
                      onChange={(event) => {
                        changeFormValue(event, "advanceAmount");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3 text-start">
                  <label>
                      Reason
                    </label>
                    <input
                      type="text"
                      checked={advanceObj.reason}
                      onChange={(event) => {
                        changeFormValue(event, "reason");
                      }}
                    ></input>
                   
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3 text-center">
                    <button className="btn btn-secondary btn-sm"
                    onClick={()=>onReset()}>Reset</button>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    {advanceObj.advanceId == 0 && 
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={saveAdvance}
                      >
                        Save Data
                      </button>}
                     {advanceObj.advanceId != 0 &&
                      <button className="btn btn-success btn-sm"
                      onClick={()=>onUpdateAdvance()}>
                        Update Data
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SalaryAdvance;