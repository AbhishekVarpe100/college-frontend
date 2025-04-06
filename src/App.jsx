import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import '../index.css';
import axios from 'axios';
import Register from './Components/Register';
import { FiMenu, FiX } from 'react-icons/fi'; // for hamburger icons
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
import Users from './Components/routes/admin_section/Users';


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
        {/* Push content down by the height of the navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile_img" element={<ProfilePhoto></ProfilePhoto>} />
            <Route path="profile_img/edit/:id/:type" element={<EditPhoto></EditPhoto>} />
            <Route path="profile_img/upload/:id/:type" element={<UploadPhoto></UploadPhoto>} />
            <Route path="profile_img/edit_info/:id/:type" element={<EditInfo></EditInfo>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


          <Route path="/admin" element={<Admin></Admin>}>
        
          <Route index element={<Announcement></Announcement>}></Route>

        <Route path='users' element={<Users></Users>}></Route>

        {/* <Route path='announcement' element={<Announcement></Announcement>}></Route> */}
        <Route path='add_videos' element={<Add_Videos></Add_Videos>}></Route>
        <Route path='statistics' element={<Statistics></Statistics>}></Route>
        <Route path='add_placements' element={<Add_Placements></Add_Placements>}></Route>
        <Route path='add_blogs' element={<Add_blogs></Add_blogs>}></Route>
        <Route path='stud_voice' element={<Student_voice></Student_voice>}></Route>

        <Route path='stud_msgs' element={<StudentMsgs></StudentMsgs>}></Route>

        <Route path='stud_msgs/reply/:username' element={<Reply></Reply>}></Route>

        <Route path='exam_applications' element={<Exams></Exams>}></Route>


        <Route path='admission_adm' element={<Admission_adm></Admission_adm>}>
        <Route path='new_course' element={<New_course></New_course>}></Route>
        <Route index element={<All_Admissions></All_Admissions>}></Route>        
        <Route path='add_sub' element={<Add_Subjects></Add_Subjects>}></Route>
        </Route>


            {/* <Route path='*' element={<AdminRoutes></AdminRoutes>}> 
              <Route path='admission_adm/*' element={<Admissions_Routes></Admissions_Routes>}></Route>
            </Route>        */}



          </Route>
            <Route path="/staff" element={<Staff></Staff>}> 
              <Route path='/staff/*' element={<StaffRoutes></StaffRoutes>}></Route>
              <Route index element={<Stud_results></Stud_results>}></Route>
            </Route>  
            <Route path="/profile" element={<Profile/>}>
               <Route index element={<About></About>}></Route>
              <Route path="/profile/*" element={<ProfileRoutes />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
