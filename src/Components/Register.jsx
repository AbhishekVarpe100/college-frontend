import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { IoWarningSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    type:''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShow = () => {
    setShow(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://college-backend-4-cgya.onrender.com/register', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('theme', 'light');

      setTimeout(() => {
        if (response.data === 'user_exist') {
          setError(
            <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IoWarningSharp className='text-2xl'/>
                <span className="font-bold"> Warning</span>
              </div>
              <p className="text-sm">Username or email already exists</p>
            </div>
          );
        } else if (response.data === 'user_saved') {
          setSuccess(
            <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaCheckCircle className='text-2xl'/>
                <span className="font-bold"> Registered</span>
              </div>
              <p className="text-sm">Registered successfully</p>
            </div>
          );
        }
        setFormData({ 'username': '', 'email': '', 'password': '','type':'' });
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 5000);
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      // alert('Failed to register. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-30 pt-10 pb-10"
      style={{
        backgroundImage: 'url("https://marvel-b1-cdn.bc0a.com/f00000000234031/www.pacificu.edu/sites/default/files/styles/page_banner/public/Pacific%20University%20Banner%20Spring%202024.jpg?itok=Q8qRVKCX")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <motion.div
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-blue-100 bg-opacity-90 rounded-lg shadow-md"
      >
        <h1 className="sea-waves text-center text-3xl font-bold h-40 pt-4">AcademiaHub University</h1>
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
        {error}
        {success}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="select">Select register type</label>
          <select required name='type' value={formData.type} onChange={handleChange}
                id="select"
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">---Select---</option>
                <option value="student">Student</option>
                <option disabled value="staff">Staff</option>
              </select>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className='relative'>
              <input
                type={show ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center text-2xl cursor-pointer' onClick={handleShow}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div>
            <p className='p-3'>Already have an account? <Link className='text-blue-700 underline' to='/login'>Login here</Link></p>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
