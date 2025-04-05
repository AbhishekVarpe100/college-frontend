import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import '../index.css';
import axios from 'axios';
import { FiMenu, FiX } from 'react-icons/fi'; // for hamburger icons
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
   const [navOpen, setNavOpen] = useState(false);

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
      <BrowserRouter>
        <nav className={`fixed top-0 left-0 right-0 z-50 p-4 shadow-md ${th === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="flex justify-between items-center">
            {/* Logo or Site Name */}
            <Link to="/" className="text-lg font-bold">Home</Link>

            {/* Hamburger Menu - Small screens */}
            <div className="md:hidden">
              <button onClick={() => setNavOpen(!navOpen)} className="focus:outline-none">
                {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>

            {/* Nav Links - Desktop */}
            <div className="hidden md:flex space-x-4 items-center">
              {username && email ? (
                <Link onClick={handleLogout} to="/login" className="hover:underline">
                  Log Out
                </Link>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
                </>
              )}

              {username && email && localStorage.getItem('type') === 'student' && (
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={handleTheme} />
                    <div className={`w-14 h-8 bg-gray-300 rounded-full shadow-inner ${theme === 'dark' ? 'bg-gray-600' : ''}`}></div>
                    <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform ${theme === 'dark' ? 'translate-x-full bg-gray-800' : ''}`}></div>
                  </div>
                  <div className="ml-3">
                    {theme === 'light' ? <MdLightMode className="text-yellow-500" /> : <MdDarkMode className="text-blue-700" />}
                  </div>
                </label>
              )}

              {/* Profile details */}
              {localStorage.getItem('type') !== 'admin' && username && email && (
                <div className="flex items-center space-x-2">
                  <div className="text-right text-sm">
                    <div>{username}</div>
                    <div>{email}</div>
                  </div>
                  <Link to="/profile_img">
                    <img
                      title="profile"
                      className="w-10 h-10 rounded-full"
                      src={!data.photo ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : `${data.photo}`}
                      alt="Profile"
                    />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Nav Links */}
          {navOpen && (
            <div className="md:hidden mt-4 flex flex-col space-y-4">
              {username && email ? (
                <Link onClick={() => { setNavOpen(false); handleLogout(); }} to="/login" className="hover:underline">
                  Log Out
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setNavOpen(false)} className="hover:underline">Login</Link>
                  <Link to="/register" onClick={() => setNavOpen(false)} className="hover:underline">Register</Link>
                </>
              )}

              {username && email && localStorage.getItem('type') === 'student' && (
                <div className="flex items-center space-x-2">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={handleTheme} />
                      <div className={`w-14 h-8 bg-gray-300 rounded-full shadow-inner ${theme === 'dark' ? 'bg-gray-600' : ''}`}></div>
                      <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform ${theme === 'dark' ? 'translate-x-full bg-gray-800' : ''}`}></div>
                    </div>
                    <div className="ml-3">
                      {theme === 'light' ? <MdLightMode className="text-yellow-500" /> : <MdDarkMode className="text-blue-700" />}
                    </div>
                  </label>
                </div>
              )}

              {/* Profile info in mobile */}
              {localStorage.getItem('type') !== 'admin' && username && email && (
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <div>{username}</div>
                    <div>{email}</div>
                  </div>
                  <Link to="/profile_img" onClick={() => setNavOpen(false)}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={!data.photo ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : `${data.photo}`}
                      alt="Profile"
                    />
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </BrowserRouter>
    </>
  );
}

export default App;
