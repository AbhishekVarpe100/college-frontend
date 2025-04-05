import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Button } from '@nextui-org/react';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [success,setSuccess]=useState("");
  const [invalidUsername,setInvalidUsername]=useState("");
  const [invalidPassword,setInvalidPassword]=useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-backend-4-cgya.onrender.com/login', { type, username, password });
      localStorage.setItem('token', `bearer ${response.data.token}`);
      localStorage.setItem('username', `${response.data.userName}`);
      localStorage.setItem('email', `${response.data.email}`);
      localStorage.setItem('type', `${response.data.type}`);
      // alert(response.data.message ? response.data.message : response.data);
      // response.data.message=='login_success'?navigate('/profile') :<></>;
      // window.reload();
      if(response.data.message=='login_success_user'){
        setSuccess(<b className="text-blue-600">Login successfully</b>)
        setTimeout(()=>{
          navigate('/profile')
      dispatch({type:'USERNAME',payload:response.data.userName}) 
     dispatch({type:'EMAIL',payload:response.data.email}) 
      setSuccess('')
        },3000)
      }
      
      else if(response.data.message=='login_success_staff'){
        setSuccess(<b className="text-blue-600">Login successfully</b>)
        setTimeout(()=>{
          navigate('/staff')
      dispatch({type:'USERNAME',payload:response.data.userName}) 
      dispatch({type:'EMAIL',payload:response.data.email})
      setSuccess("")
        },3000)
      // alert("Hello")
      }

      else if(response.data.message=='login_success_admin'){
        setSuccess(<b className="text-blue-600">Login successfully</b>)
        setTimeout(()=>{
          navigate('/admin')
      dispatch({type:'USERNAME',payload:response.data.userName}) 
      dispatch({type:'EMAIL',payload:response.data.email})
      setSuccess("")
        },3000)
      }

      else if(response.data=='user not found'){
        setInvalidUsername(<b className="text-red-600">User not found</b>);
      }

      

      else if(response.data=='incorrect password'){
        setInvalidPassword(<b className="text-red-600">Incorrect password</b>);
      }

      setTimeout(()=>{
        setInvalidUsername('');
        setInvalidPassword('');
      },5000)
      

    } catch (e) {
      console.log(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  useEffect(()=>{
    if(localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('type')=='student'){
      navigate('/profile');
    }
    else if(localStorage.getItem('username') && localStorage.getItem('email') && localStorage.getItem('type')=='staff'){
      navigate('/staff')
    }
  },[])

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{ backgroundImage: 'linear-gradient(to bottom, cyan, white)' }}>
      <motion.div
        initial={{ x: +500 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-4 sm:p-6 lg:p-8"
      >
        
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl text-center font-bold mb-6">Login</h2>
          {success}
          {invalidUsername}
          {invalidPassword}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="select" className="block text-gray-700 text-sm font-bold mb-2">Select login type</label>
              <select required onChange={(e) => setType(e.target.value)}
                id="select"
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">---Select---</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input required
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus:border-indigo-500 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <div className="relative">
                <input required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:border-indigo-500 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="text-2xl" /> : <FaEye className="text-2xl" />}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">

              <Tooltip color='primary' content="Sign in">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Sign In
              </button>
              </Tooltip>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
