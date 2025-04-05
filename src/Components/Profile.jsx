import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBloggerB } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import { MdPhoneInTalk } from "react-icons/md";
import { CgNotes } from "react-icons/cg";


function Profile() {
  const [tokenValid, setTokenValid] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [th,getTh]=useState(localStorage.getItem('theme'));
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  useEffect(() => {
    sendToken();
  }, []);

  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);

  async function sendToken() {
    let token_header = localStorage.getItem('token');
    const response = await axios.post('https://college-backend-4-cgya.onrender.com/getprofile', {
      token_header,
    });

    if (response.data.message === 'profile_accessed') {
      if(localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('type')=='student'){
        setTokenValid(true);
        localStorage.setItem(
          'token_expires_in',
          `${(response.data.authData.exp - response.data.authData.iat) / 60} minutes`
        );
      } 
      
    } else if (response.data.result === 'invalid token') {
      setTokenValid(false);
      setTimeout(() => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('token_expires_in');
        localStorage.removeItem('token');
      }, 3000);
    }
  }

  return (
    <div>
      {tokenValid ? (
        <>
          <div className="flex my-4 py-4">
            {/* Sidebar */}
            <div   className={`sidebar overflow-y-auto  ${th=='dark'? 'bg-black text-white':'bg-white text-black'} text-white w-64 min-h-screen flex-shrink-0 ${isSidebarOpen ? '' : 'hidden md:block'}`}>
              <div className="p-4">
                <h2 className={`text-2xl ${th=='dark'? 'bg-black text-white':'bg-white text-black'} font-bold mb-6`}>Content</h2>
                <ul>
                  <li className="mb-2">
                    <Link
                      to="/profile/"
                      className="rounded block p-2 bg-gray-700 hover:bg-gray-600"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      About
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/examinations"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >

                      <span className="flex items-center">Examinations <FaGraduationCap className='ml-2'></FaGraduationCap></span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/admissions"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Admissions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/placements"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Placements
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/campus"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Campus and events videos
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/blogs"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      <span className="flex items-center">
                          Blogs <FaBloggerB className="ml-2" />
                      </span>
                      
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/contact_us"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      <span className="flex items-center">

                        Contact Us <MdPhoneInTalk className='ml-2'></MdPhoneInTalk>
                      </span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/results"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      <span className="flex items-center">Results <CgNotes className='ml-2'></CgNotes></span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/profile/notices"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      <span className="flex items-center">Notice</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    {/* <Link
                      to="/profile/chat"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      <span className="flex items-center">Message to admin</span>
                    </Link> */}
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
              <button
                className="md:hidden p-4 bg-gray-800 text-white"
                onClick={toggleSidebar}
              >
                {isSidebarOpen? <MdClose></MdClose> : <GiHamburgerMenu></GiHamburgerMenu> }
              </button>
              <div className="ml-4 md:ml-0">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-10">
          Your token has expired{' '}
          <Link
            className="text-blue-700 font-bold hover:underline hover:text-blue-400"
            to="/login"
          >
            Login here
          </Link>{' '}
          again to continue
        </div>
      )}
    </div>
  );
}

export default Profile; 
