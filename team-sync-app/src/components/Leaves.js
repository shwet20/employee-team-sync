import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Leaves = () => {
    const apiEndPoint = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    let [leaveList,setLeaveList] = useState([])
    let [leaveObj,setLeaveObj] = useState({
      "empName": "",
      "empContactNo": "",
      "employeeId": 0,
      "leaveDate": "",
      "leaveId": 0,
      "leaveReason": "",
      "noOfFullDayLeaves": 0,
      "noOfHalfDayLeaves": 0
    })
    let [employeeList,setemployeeList] = useState([])
    const [val , setVal]= useState("");

    const onChangeHandler =(event)=>{
        setVal(event.target.value)
    }

    useEffect(()=>{
        getEmployeeList();
        getAllLeaves();
    },[])

    const getEmployeeList = async () => { 
        try {
            const result = await axios.get(apiEndPoint + 'GetAllEmployee'); 
            setemployeeList(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const changeFormValue = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }

    const getAllLeaves = async () => {
      try {
        const result = await axios.get(apiEndPoint + "GetAllLeaves");
        setLeaveList(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllLeavesbyEmployeeId = async (id) =>{
        try {
            const result = await axios.get(apiEndPoint + "GetAllLeavesByEmpId?empid=" + id);
            // setEmployeeObj(result.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const saveLeave = async () => { 
        try {
            const result = await axios.post(apiEndPoint + "AddLeave", leaveObj);
            if (result.data.result) {
                alert('Leave added');
                getAllLeaves();
            } else {
                alert(result.data.message)
            }
        } catch (error) { 
            console.log(error)
        }
        setLeaveObj({
            "empName": "",
            "empContactNo": "",
            "employeeId": 0,
            "leaveDate": "",
            "leaveId": 0,
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
    })   
    }

    const onEditLeave = async (item) => {
        setLeaveObj({
            "empName": item.empName,
            "empContactNo": item.empContactNo,
            "employeeId": item.employeeId,
            "leaveDate": item.leaveDate,
            "leaveId": item.leaveId,
            "leaveReason": item.leaveReason,
            "noOfFullDayLeaves": item.noOfFullDayLeaves,
            "noOfHalfDayLeaves": item.noOfHalfDayLeaves
    }) 
          };

          
          const onUpdateLeave =async()=> {
            try {
                const result = await axios.post(apiEndPoint + "UpdateLeave",leaveObj);
                if (result.data.result) {
                  alert("Leave Updated");
                  getAllLeaves();
                } else {
                  alert(result.data.message);
                }
              } catch (error) {
                console.log(error);
              }
              setLeaveObj({
                "empName": "",
                "empContactNo": "",
                "employeeId": 0,
                "leaveDate": "",
                "leaveId": 0,
                "leaveReason": "",
                "noOfFullDayLeaves": 0,
                "noOfHalfDayLeaves": 0
        })   
        }

        const onDeleteLeave =async(id)=>{
            const isDelte = window.confirm("Are You Sure want to Delete");
            if (isDelte) {
              try {
                const result = await axios.get(apiEndPoint + "DeleteLeaveById?leaveid=" + id);
                if (result.data.result) {
                  alert("Leave Deleted");
                  getAllLeaves();
                } else {
                  alert(result.data.message);
                }
              } catch (error) {
                console.log(error);
              }
            }
          }

          const onReset =()=>{
            setLeaveObj({
                "empName": "",
                "empContactNo": "",
                "employeeId": 0,
                "leaveDate": "",
                "leaveId": 0,
                "leaveReason": "",
                "noOfFullDayLeaves": 0,
                "noOfHalfDayLeaves": 0
        })   
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
                      <th>Contact No</th>
                      <th>Leave date</th>
                      <th>full-day leaves No</th>
                      <th>half-day leaves No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveList?.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                         <td>{item.empName} </td>
                            <td>{item.empContactNo}</td>
                         <td>{item.leaveDate} </td>
                         <td>{item.noOfFullDayLeaves} </td>
                         <td>{item.noOfHalfDayLeaves} </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary mx-1"
                         onClick={()=>onEditLeave(item)}
                         >
                              
                              ✒️
                            </button>
                            <button className="btn btn-sm btn-outline-danger mx-1"
                            onClick={()=>onDeleteLeave(item.leaveId)}
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
                  <div className="col-12">
                    <label>Employee Name</label>
                    <select
                      className="form-select"
                      value={leaveObj.employeeId}
                      onChange={(event) => {
                        onChangeHandler(event)
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
                <div className="col-12">
                    <label>Employee Contact No</label>
                    <select
                      className="form-select"
                      value={leaveObj.empContactNo}
                      onChange={(event) => {
                        changeFormValue(event, "empContactNo");
                      }}
                    >
                      <option>Select Contact No</option>
                      {employeeList.map((item) => {
                        return (
                            val == item.empId ?
                          <option value={item.empId}>{item.empContactNo}</option>
                          : <option value={leaveObj.empContactNo}>{leaveObj.empContactNo}</option>
                        );
                      })}
                    </select>
                  </div>
                    </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <label>Leave Date</label>
                    <input
                      type="date"
                      value={leaveObj.leaveDate}
                      onChange={(event) => {
                        changeFormValue(event, "leaveDate");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="row mt-3">
                <div className="col-6">
                    <label>Ful-day leaves No</label>
                    <input
                      type="number"
                      value={leaveObj.noOfFullDayLeaves}
                      onChange={(event) => {
                        changeFormValue(event, "noOfFullDayLeaves");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Half-day leaves No</label>
                    <input
                      type="number"
                      value={leaveObj.noOfHalfDayLeaves}
                      onChange={(event) => {
                        changeFormValue(event, "noOfHalfDayLeaves");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-3 text-start">
                  <label>
                      Leave Reason
                    </label>
                    <textarea
                    className='form-control'
                      
                      value={leaveObj.leaveReason}
                      onChange={(event) => {
                        changeFormValue(event, "leaveReason");
                      }}
                    ></textarea>
                   
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3 text-center">
                    <button className="btn btn-secondary btn-sm"
                    onClick={()=>onReset()}>Reset</button>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    {leaveObj.leaveId == 0 && 
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={saveLeave}
                      >
                        Save Data
                      </button>}
                     {leaveObj.leaveId != 0 &&
                      <button className="btn btn-success btn-sm"
                      onClick={()=>onUpdateLeave()}>
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

export default Leaves;