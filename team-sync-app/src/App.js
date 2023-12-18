import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import Employee from './components/Employee';
import SalaryAdvance from './components/SalaryAdvance';
import SalaryVoucher from './components/SalaryVoucher';
import Leaves from './components/Leaves';
import Header from './components/Header';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
     
      <Routes>
        <Route path='/' element={<Dashboard />} ></Route>
        <Route path='/Attendance' element={<Attendance />} ></Route>
        <Route path='/Employee' element={<Employee />} ></Route>
        <Route path='/Salary-Advance' element={<SalaryAdvance />} ></Route>
        <Route path='/Salary-Voucher' element={<SalaryVoucher />} ></Route>
        <Route path='/Leaves' element={<Leaves />} ></Route>
        <Route path='*' element={<Error></Error>} ></Route>
      </Routes>

    </BrowserRouter>
  </div>
  );
}

export default App;
