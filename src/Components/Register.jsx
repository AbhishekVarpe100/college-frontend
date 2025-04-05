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
    type: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShow = () => {
    setShow(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post('https://college-backend-4-cgya.onrender.com/register', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('theme', 'light');

      setTimeout(() => {
        setIsLoading(false);
        if (response.data === 'user_exist') {
          setError(
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
              <div className="flex items-center space-x-2">
                <IoWarningSharp className="text-red-500 text-xl flex-shrink-0" />
                <span className="font-bold">Warning</span>
              </div>
              <p className="mt-1">Username or email already exists</p>
            </div>
          );
        } else if (response.data === 'user_saved') {
          setSuccess(
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md" role="alert">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                <span className="font-bold">Success</span>
              </div>
              <p className="mt-1">Registration completed successfully</p>
            </div>
          );
        }
        setFormData({ 'username': '', 'email': '', 'password': '', 'type': '' });
        setTimeout(() => {
          setSuccess("");
          setError("");
        }, 5000);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      console.error('Error submitting form:', error);
      setError(
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
          <div className="flex items-center space-x-2">
            <IoWarningSharp className="text-red-500 text-xl flex-shrink-0" />
            <span className="font-bold">Error</span>
          </div>
          <p className="mt-1">Failed to register. Please try again.</p>
        </div>
      );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-60 py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url("https://marvel-b1-cdn.bc0a.com/f00000000234031/www.pacificu.edu/sites/default/files/styles/page_banner/public/Pacific%20University%20Banner%20Spring%202024.jpg?itok=Q8qRVKCX")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6">
            <h1 className="text-center text-3xl font-extrabold text-white tracking-wide">
              AcademiaHub University
            </h1>
          </div>
          
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Account</h2>
            
            {error && <div className="mb-4">{error}</div>}
            {success && <div className="mb-4">{success}</div>}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="select" className="block text-sm font-medium text-gray-700">Account Type</label>
                <div className="relative">
                  <select 
                    required 
                    name="type" 
                    value={formData.type} 
                    onChange={handleChange}
                    id="select"
                    className="block w-full pl-3 pr-10 py-3 border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 shadow-sm rounded-lg text-gray-700"
                  >
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a strong password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-600 hover:text-gray-800" onClick={handleShow}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Already have an account? 
                  <Link to="/login" className="ml-1 font-medium text-blue-600 hover:text-blue-500 transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center py-3 px-4 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    isLoading 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
