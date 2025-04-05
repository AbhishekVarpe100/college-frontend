import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import {Link ,Outlet} from 'react-router-dom';
function Admin() {
  
  const [tokenValid,setTokenValid]=useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(()=>{
    sendToken();
  },[]);

  async function sendToken() {
    let token_header = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/admin', {
      token_header,
    });

    if (response.data.message === 'profile_accessed') {

      if(localStorage.getItem('token') && localStorage.getItem('email') && localStorage.getItem('type')=='admin'){
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
    <>
    {
      tokenValid?
      
      
        <div>
        <div className="flex py-2">
            {/* Sidebar */}
            <div className={`bg-gray-300 sidebar overflow-y-auto text-white w-64 min-h-screen flex-shrink-0 ${isSidebarOpen ? '' : 'hidden md:block'}`}>
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-6">Content</h2>
                <ul>
                  <li className="mb-2">
                    <Link
                      to="/admin/"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Create notice/announcements
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/admin/add_videos"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >

                      <span className="flex items-center">Add Videos</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/admin/statistics"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Admissions statistics
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/admin/admission_adm"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Admissions
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/admin/exam_applications"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Exam applications
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/admin/add_placements"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Add placements
                    </Link>
                  </li>

                  <li className="mb-2">
                    <Link
                      to="/admin/add_blogs"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Add blogs
                    </Link>
                  </li>

                  <li className="mb-2">
                    <Link
                      to="/admin/stud_voice"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Students voice
                    </Link>
                  </li>
                  {/* <li className="mb-2">
                    <Link
                      to="/admin/stud_msgs"
                      className="block p-2 bg-gray-700 hover:bg-gray-600 rounded"
                      onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click
                    >
                      Students messages
                    </Link>
                  </li> */}

                  
                  
                  
                  
                  
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
        
        
        </div >
        
        
       

        
        
        
        :(

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
      )
    }
    </>
    
  )
}

export default Admin;