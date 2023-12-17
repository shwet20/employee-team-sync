import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attendance = () => {
    const apiEndPoint = "https://onlinetestapi.gerasim.in/api/TeamSync/";
    let [attendanceList,setAttendanceList] = useState([])
    let [attendanceObj,setattendanceObj] = useState({
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate": "",
        "inTime": "",
        "outTime": "",
        "isFullDay": true
    })
    let [employeeList,setemployeeList] = useState([])

    const changeFormValue = (event, key) => {
        setattendanceObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    
    const changeCheckBoxValue = (event) => {
        setattendanceObj(prevObj => ({ ...prevObj, IsFullDay: event.target.checked }))
    }

    useEffect(()=>{
        getEmployeeList();
        getAllAttendance();
    },[])

    const getEmployeeList = async () => { 
        try {
            const result = await axios.get(apiEndPoint + 'GetAllEmployee'); 
            setemployeeList(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllAttendance = async () => {  
        try {
            const result = await axios.get(apiEndPoint + 'GetAllAttendance'); 
            setAttendanceList(result.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const saveAttendance = async () => { 
        try {
            const result = await axios.post(apiEndPoint + 'AddAttendance', attendanceObj);  
            if (result.data.result) {
                alert('attendance Created');
                getAllAttendance();
            } else {
                alert(result.data.message)
            }
        } catch (error) { 
            console.log(error)
        }
        setattendanceObj({
            "attendanceId": 0,
            "employeeId": 0,
            "attendanceDate": "",
            "inTime": "",
            "outTime": "",
            "isFullDay": true
    })   
    }

    const onEditAttendance = async (item) => {
    setattendanceObj({
        "attendanceId": item.attendanceId,
        "employeeId": item.employeeId,
        "attendanceDate": item.attendanceDate,
        "inTime": item.inTime,
        "outTime": item.outTime,
        "isFullDay": item.isFullDay
})
      };

    const updateAttendance =async()=> {
        // /UpdateAttendance'
        try {
            const result = await axios.post(apiEndPoint + "UpdateAttendance",attendanceObj);
            if (result.data.result) {
              alert("Attendance Updated");
              getAllAttendance();
            } else {
              alert(result.data.message);
            }
          } catch (error) {
            console.log(error);
          }
          setattendanceObj({
            "attendanceId": 0,
            "employeeId": 0,
            "attendanceDate": "",
            "inTime": "",
            "outTime": "",
            "isFullDay": true
    }) 
    }

    const onDeleteAttendance =async(id)=>{
      // /DeleteAttendanceById
      const isDelte = window.confirm("Are You Sure want to Delete");
      if (isDelte) {
        try {
          const result = await axios.get(apiEndPoint + "DeleteAttendanceById?attendanceid=" + id);
          if (result.data.result) {
            alert("Attendance Deleted");
            getAllAttendance();
          } else {
            alert(result.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }


    return (
      <div className="container-fluid px-3">
        <div className="row">
          <div className="col-9">
            <div className="card">
              <div className="card-header bg-success">Attendance List</div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Name</th>
                      <th>Contact No</th>
                      <th>attendance Date</th>
                      <th>In-time</th>
                      <th>Out-time</th>
                      <th>Is Full Day</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceList.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1} </td>
                          <td>{item.empName} </td>
                          <td>{item.empContactNo}</td>
                          <td>{item.attendanceDate} </td>
                          <td>{item.inTime} </td>
                          <td>{item.outTime} </td>
                          <td>{item.isFullDay ? "Full Day" : "Half Day"} </td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary mx-1"
                            onClick={()=>onEditAttendance(item)}>
                              {" "}
                              ✒️{" "}
                            </button>
                            <button className="btn btn-sm btn-outline-danger mx-1"
                            onClick={()=>onDeleteAttendance(item.attendanceId)}>
                              {" "}
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
              <div className="card-header bg-success">New Attendance</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <label>Employee</label>
                    <select
                      className="form-select"
                      value={attendanceObj.employeeId}
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
                  <div className="col-6">
                    <label>Date</label>
                    <input
                      type="date"
                      value={attendanceObj.attendanceDate}
                      onChange={(event) => {
                        changeFormValue(event, "attendanceDate");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-6">
                    <label>In Time</label>
                    <input
                      type="time"
                      value={attendanceObj.inTime}
                      onChange={(event) => {
                        changeFormValue(event, "inTime");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                  <div className="col-6">
                    <label>Out Time</label>
                    <input
                      type="time"
                      value={attendanceObj.outTime}
                      onChange={(event) => {
                        changeFormValue(event, "outTime");
                      }}
                      className="form-control"
                    ></input>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3 text-start">
                    <input
                      type="checkbox"
                      checked={attendanceObj.isFullDay}
                      onChange={(event) => {
                        changeCheckBoxValue(event);
                      }}
                      id="fillId"
                    ></input>
                    <label className="ms-2" htmlFor="fillId">
                      Full Day
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3 text-center">
                    <button className="btn btn-secondary btn-sm">Reset</button>
                  </div>
                  <div className="col-6 mt-3 text-center">
                    {attendanceObj.attendanceId == 0 && 
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={saveAttendance}
                      >
                        Save Data
                      </button>}
                     {attendanceObj.attendanceId != 0 &&
                      <button className="btn btn-success btn-sm" 
                      onClick={()=>updateAttendance()}>
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


export default Attendance;