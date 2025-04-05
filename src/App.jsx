import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import '../index.css';
import axios from 'axios';
import Register from './Components/Register';
import Login from './Components/Login';
import Home from './Components/Home';
import ProfileRoutes from './Components/ProfileRoutes';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Profile from './Components/Profile';
import { useSelector, useDispatch } from 'react-redux';
import Admin from './Components/routes/admin_section/Admin';
import Staff from './Components/routes/staff_section/Staff';
import ProfilePhoto from './Components/ProfilePhoto';
import EditPhoto from './Components/EditPhoto';
import UploadPhoto from './Components/UploadPhoto';
import EditInfo from './Components/EditInfo';
import Announcement from './Components/routes/admin_section/Announcement';
// import AdminRoutes from './Components/AdminRoutes';
import StaffRoutes from './Components/StaffRoutes';

import New_course from './Components/routes/admin_section/New_course';

import Statistics from './Components/routes/admin_section/Statistics';
import Add_Placements from './Components/routes/admin_section/Add_Placements';
import Add_Videos from './Components/routes/admin_section/Add_Videos';
import Add_blogs from './Components/routes/admin_section/Add_blogs';
import Student_voice from './Components/routes/admin_section/Student_voice';
import Admission_adm from './Components/routes/admin_section/Admissions_adm';
import All_Admissions from './Components/routes/admin_section/All_Admissions';
import Add_Subjects from './Components/routes/admin_section/Add_Subjects';
import About from './Components/routes/stud_section/About';
import Exams from './Components/routes/admin_section/Exams';
import Stud_results from './Components/routes/staff_section/Stud_results';
import StudentMsgs from './Components/routes/admin_section/StudentMsgs';
import Reply from './Components/routes/admin_section/Reply';


function App() {
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_in');
    window.location.reload();
  };
  let [theme, setTheme] = useState(localStorage.getItem('theme'));
  const [getTheme,setGetTheme]=useState('');

  const username=useSelector((state)=>state.username);
  const email=useSelector((state)=>state.email);
  const type=useSelector((state)=>state.type);
  const [data,setData]=useState({});

  const [th,getTh]=useState(localStorage.getItem('theme'));

  // const handleChange = async (event) => {
  //   await setChecked(event.target.checked);
  //   await localStorage.setItem('theme',event.target.checked);
  //   window.location.reload(true);
  // };

  const handleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/change_theme', {
        theme: newTheme,
        username,
        email,
      });
      localStorage.setItem('theme', newTheme);
      window.location.reload();
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };


 const getTheme_=async()=>{
 const res= await axios.get('https://college-backend-4-cgya.onrender.com/get_theme',{params:{username,email}});
 }

  const dataObj={
    username:username,
    email:email,
    type:type,
  }

  async function getData(){
    const response=await axios.post('https://college-backend-4-cgya.onrender.com/getprofile_data',dataObj);
    setData(response.data)
  }
  

useEffect(() => {
  getData();
  getTheme_();
}, []);



  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 ${th === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} p-4 z-50 shadow-md`}>
  <div className="flex items-center justify-between">
    {/* Logo or Brand */}
    <Link to="/" className="text-xl font-bold">
      UniVerse
    </Link>

    {/* Hamburger icon */}
    <div className="md:hidden">
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex space-x-6 items-center">
      <Link to="/" className="hover:underline">Home</Link>

      {username && email ? (
        <Link onClick={handleLogout} to="/login" className="hover:underline">Log Out</Link>
      ) : (
        <>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </>
      )}

      {/* Theme Toggle (Student only) */}
      {username && email && localStorage.getItem('type') === 'student' && (
        <label className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={handleTheme} />
            <div className={`w-14 h-8 rounded-full shadow-inner transition ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
            <div className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-full bg-gray-800' : 'bg-white'}`} />
          </div>
          <div className="ml-3">
            {theme === 'light' ? <MdLightMode className="text-yellow-500" /> : <MdDarkMode className="text-blue-700" />}
          </div>
        </label>
      )}

      {/* Profile Section */}
      {(localStorage.getItem('type') !== 'admin' && username && email) && (
        <div className="flex items-center space-x-3">
          <div className="text-sm text-right">
            <div>{username}</div>
            <div>{email}</div>
          </div>
          <Link to="/profile_img">
            <img
              title="profile"
              className="w-10 h-10 rounded-full"
              src={data.photo ? `${data.photo}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
              alt="Profile"
            />
          </Link>
        </div>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {menuOpen && (
    <div className="md:hidden mt-4 space-y-4 text-center">
      <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
      {username && email ? (
        <Link onClick={() => { handleLogout(); setMenuOpen(false); }} to="/login" className="block hover:underline">Log Out</Link>
      ) : (
        <>
          <Link to="/login" className="block hover:underline" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="block hover:underline" onClick={() => setMenuOpen(false)}>Register</Link>
        </>
      )}

      {username && email && localStorage.getItem('type') === 'student' && (
        <div className="flex justify-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={handleTheme} />
              <div className={`w-14 h-8 rounded-full shadow-inner transition ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
              <div className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-full bg-gray-800' : 'bg-white'}`} />
            </div>
            <div className="ml-3">
              {theme === 'light' ? <MdLightMode className="text-yellow-500" /> : <MdDarkMode className="text-blue-700" />}
            </div>
          </label>
        </div>
      )}

      {(localStorage.getItem('type') !== 'admin' && username && email) && (
        <div className="flex flex-col items-center">
          <div>{username}</div>
          <div>{email}</div>
          <Link to="/profile_img">
            <img
              title="profile"
              className="w-10 h-10 rounded-full mt-2"
              src={data.photo ? `${data.photo}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'}
              alt="Profile"
            />
          </Link>
        </div>
      )}
    </div>
  )}
</nav>

    </>
  );
}

export default App;
