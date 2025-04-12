import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaUser, FaBuilding, FaMoneyBillWave, FaUserGraduate, FaImage } from 'react-icons/fa';

function Add_Placements() {
  const [data, setData] = useState({
    name: '',
    package_: '',
    company: '',
  });
  const [file, setFile] = useState('');
  const [mainData, setMainData] = useState([]);
  const [change, setChange] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_placements_data');
      setMainData(res.data);
    } catch (error) {
      console.error("Failed to fetch placement data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [change]);

  async function handleDelete(id) {
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/delete_placement_info', { id });
      setChange(prev => !prev);
    } catch (error) {
      console.error("Failed to delete placement:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('package_', data.package_);
    formData.append('file', file);
    formData.append('company', data.company);
    
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/create_placement', formData);
      setChange(prev => !prev);
      setData({ name: '', package_: '', company: '' });
      setFile('');
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add placement:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUserGraduate className="text-indigo-600 text-3xl mr-3" />
              <h1 className="text-2xl font-serif text-gray-800 font-semibold">Placement Manager</h1>
            </div>
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded border border-indigo-700 shadow transition-colors duration-300"
            >
              {isFormOpen ? 'Cancel' : 'New Placement'} {!isFormOpen && <FaPlus className="ml-2" />}
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-8">
        {/* Form Section (Collapsible) */}
        {isFormOpen && (
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300">
            <h2 className="text-xl font-serif text-gray-800 mb-6 pb-2 border-b">Add New Placement Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="photo">
                  <FaImage className="mr-2 text-gray-600" /> Candidate Photo
                </label>
                <input 
                  required 
                  onChange={(e) => setFile(e.target.files[0])} 
                  id="photo" 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="name">
                  <FaUser className="mr-2 text-gray-600" /> Candidate Name
                </label>
                <input 
                  required 
                  id="name"
                  name="name" 
                  value={data.name}
                  onChange={handleChange} 
                  placeholder="Enter the candidate's full name" 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="company">
                  <FaBuilding className="mr-2 text-gray-600" /> Company Name
                </label>
                <input 
                  required 
                  id="company"
                  name="company" 
                  value={data.company}
                  onChange={handleChange} 
                  placeholder="Enter the hiring company's name" 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="package_">
                  <FaMoneyBillWave className="mr-2 text-gray-600" /> Package Details
                </label>
                <input 
                  required 
                  id="package_"
                  name="package_" 
                  value={data.package_}
                  onChange={handleChange} 
                  placeholder="Enter the salary package (e.g. 8 LPA)" 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
                />
              </div>
              
              <div className="text-right">
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <FaPlus className="mr-2" /> Add Placement Record
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Placements List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-serif text-gray-800 mb-6 pb-2 border-b flex items-center">
            <FaUserGraduate className="mr-2 text-indigo-600" /> Placed Students
          </h2>
          
          {mainData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No placement records have been added yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainData.map((item) => (
                <div
                  key={item._id || item.name}
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100 shadow-sm">
                        <img
                          src={item.photo}
                          alt={`${item.name}'s photo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-semibold text-gray-800">
                        {item.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <FaBuilding className="text-indigo-500 mr-2" />
                        <p className="font-medium">Company:</p>
                        <p className="ml-2">{item.company}</p>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <FaMoneyBillWave className="text-green-500 mr-2" />
                        <p className="font-medium">Package:</p>
                        <p className="ml-2">{item.package_}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300 text-sm font-medium ml-auto"
                      >
                        <FaTrash className="mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      
    </div>
  );
}

export default Add_Placements;