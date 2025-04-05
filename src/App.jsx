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
  const [getTheme, setGetTheme] = useState('');

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const type = useSelector((state) => state.type);
  const [data, setData] = useState({});

  const [th, getTh] = useState(localStorage.getItem('theme'));

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

  const getTheme_ = async () => {
    await axios.get('https://college-backend-4-cgya.onrender.com/get_theme', {
      params: { username, email },
    });
  };

  const dataObj = { username, email, type };

  async function getData() {
    const response = await axios.post('https://college-backend-4-cgya.onrender.com/getprofile_data', dataObj);
    setData(response.data);
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
    <div className="text-xl font-bold">
      <Link to="/">AcademiaHub</Link>
    </div>

    {/* Hamburger Toggle */}
    <div className="md:hidden">
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/" className="hover:underline">Home</Link>
      {username && email ? (
        <Link onClick={handleLogout} to="/login" className="hover:underline">Log Out</Link>
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
            <div className={`w-14 h-8 bg-gray-300 rounded-full shadow-inner transition ${theme === 'dark' ? 'bg-gray-600' : ''}`}></div>
            <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${theme === 'dark' ? 'translate-x-full bg-gray-800' : ''}`}></div>
          </div>
          <div className="ml-3">
            {theme === 'light' ? <MdLightMode className="text-yellow-500 w-5 h-5" /> : <MdDarkMode className="text-blue-700 w-5 h-5" />}
          </div>
        </label>
      )}
      {(type !== 'admin' && email && username) && (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-right max-w-[150px]">
            <span>{username}</span><br />
            <span>{email}</span>
          </div>
          <Link to='/profile_img'>
            <img className="w-10 h-10 rounded-full" src={!data.photo ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : `${data.photo}`} alt="Profile" />
          </Link>
        </div>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="md:hidden mt-4 space-y-2">
      <Link to="/" className="block hover:underline" onClick={() => setMobileMenuOpen(false)}>Home</Link>
      {username && email ? (
        <Link onClick={() => { handleLogout(); setMobileMenuOpen(false); }} to="/login" className="block hover:underline">Log Out</Link>
      ) : (
        <>
          <Link to="/login" className="block hover:underline" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/register" className="block hover:underline" onClick={() => setMobileMenuOpen(false)}>Register</Link>
        </>
      )}
      {username && email && localStorage.getItem('type') === 'student' && (
        <div className="flex items-center space-x-2 mt-2">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={theme === 'dark'} onChange={handleTheme} />
              <div className={`w-14 h-8 bg-gray-300 rounded-full shadow-inner transition ${theme === 'dark' ? 'bg-gray-600' : ''}`}></div>
              <div className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${theme === 'dark' ? 'translate-x-full bg-gray-800' : ''}`}></div>
            </div>
            <div className="ml-3">
              {theme === 'light' ? <MdLightMode className="text-yellow-500 w-5 h-5" /> : <MdDarkMode className="text-blue-700 w-5 h-5" />}
            </div>
          </label>
        </div>
      )}
    </div>
  )}
</nav>


        {/* Main Content with padding for navbar */}
        <div className="pt-24 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile_img" element={<ProfilePhoto />} />
            <Route path="profile_img/edit/:id/:type" element={<EditPhoto />} />
            <Route path="profile_img/upload/:id/:type" element={<UploadPhoto />} />
            <Route path="profile_img/edit_info/:id/:type" element={<EditInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<Admin />}>
              <Route index element={<Announcement />} />
              <Route path='add_videos' element={<Add_Videos />} />
              <Route path='statistics' element={<Statistics />} />
              <Route path='add_placements' element={<Add_Placements />} />
              <Route path='add_blogs' element={<Add_blogs />} />
              <Route path='stud_voice' element={<Student_voice />} />
              <Route path='stud_msgs' element={<StudentMsgs />} />
              <Route path='stud_msgs/reply/:username' element={<Reply />} />
              <Route path='exam_applications' element={<Exams />} />
              <Route path='admission_adm' element={<Admission_adm />}>
                <Route path='new_course' element={<New_course />} />
                <Route index element={<All_Admissions />} />
                <Route path='add_sub' element={<Add_Subjects />} />
              </Route>
            </Route>

            <Route path="/staff" element={<Staff />}>
              <Route path='/staff/*' element={<StaffRoutes />} />
              <Route index element={<Stud_results />} />
            </Route>

            <Route path="/profile" element={<Profile />}>
              <Route index element={<About />} />
              <Route path="/profile/*" element={<ProfileRoutes />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
