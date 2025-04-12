import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaImage, FaHeading, FaFileAlt, FaBlog } from 'react-icons/fa';

function Add_blogs() {
  const [data, setData] = useState({
    'title': '',
    'description': ''
  });
  const [file, setFile] = useState('');
  const [mainData, setMainData] = useState([]);
  const [change, setChange] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_blogs_data');
      setMainData(res.data);
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [change]);

  async function handleDelete(id) {
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/delete_blog_info', { id });
      setChange(prev => !prev);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('file', file);
    
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/add_blog', formData);
      setChange(prev => !prev);
      setData({ title: '', description: '' });
      setFile('');
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBlog className="text-blue-600 text-3xl mr-3" />
              <h1 className="text-2xl font-serif text-gray-800 font-semibold">Blog Manager</h1>
            </div>
            <button 
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded border border-blue-700 shadow transition-colors duration-300"
            >
              {isFormOpen ? 'Cancel' : 'New Blog'} {!isFormOpen && <FaPlus className="ml-2" />}
            </button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-8">
        {/* Form Section (Collapsible) */}
        {isFormOpen && (
          <div className="mb-12 bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300">
            <h2 className="text-xl font-serif text-gray-800 mb-6 pb-2 border-b">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="photo">
                  <FaImage className="mr-2 text-gray-600" /> Blog Image
                </label>
                <input 
                  required 
                  onChange={(e) => setFile(e.target.files[0])} 
                  id="photo" 
                  type="file" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="title">
                  <FaHeading className="mr-2 text-gray-600" /> Blog Title
                </label>
                <input 
                  required 
                  id="title"
                  name="title" 
                  value={data.title}
                  onChange={handleChange} 
                  placeholder="Enter the title of your blog" 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <label className="flex items-center text-gray-700 mb-2 font-medium" htmlFor="description">
                  <FaFileAlt className="mr-2 text-gray-600" /> Blog Content
                </label>
                <textarea 
                  required 
                  id="description"
                  rows="7" 
                  name="description" 
                  value={data.description}
                  onChange={handleChange} 
                  placeholder="Write your blog content here..." 
                  className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                ></textarea>
              </div>
              
              <div className="text-right">
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <FaPlus className="mr-2" /> Publish Blog Post
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Blog List Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl font-serif text-gray-800 mb-6 pb-2 border-b flex items-center">
            <FaBlog className="mr-2 text-blue-600" /> Published Blog Posts
          </h2>
          
          {mainData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No blog posts have been created yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mainData.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={item.image}
                      alt={`Cover for ${item.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="h-24 overflow-hidden">
                      <p className="text-gray-600 text-sm line-clamp-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-300 text-sm font-medium"
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

export default Add_blogs;