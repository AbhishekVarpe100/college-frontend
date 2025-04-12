import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosAddCircle, IoMdNotifications, IoMdTrash, IoMdRefresh, IoMdSend, IoMdTime, IoMdCalendar } from "react-icons/io";
import { FaBullhorn, FaRegLightbulb, FaExclamationTriangle } from "react-icons/fa";

function Announcement() {
  const [notice, setNotice] = useState('');
  const [data, setData] = useState([]);
  const [change, setChange] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/create_notice', { notice });
      change ? setChange(false) : setChange(true);
      setNotice(''); // Clear input after submission
      showSuccessMessage("Announcement added successfully!");
    } catch (err) {
      setError("Failed to add announcement. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const showSuccessMessage = (message) => {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('https://college-backend-4-cgya.onrender.com/delete_notice', { id });
      change ? setChange(false) : setChange(true);
      showSuccessMessage("Announcement removed successfully!");
    } catch (err) {
      setError("Failed to delete announcement. Please try again.");
      setTimeout(() => setError(null), 3000);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://college-backend-4-cgya.onrender.com/get_notices');
      setData(res.data.reverse());
    } catch (err) {
      setError("Failed to load announcements. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [change]);

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get time from date
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const getRandomIcon = () => {
    const icons = [<FaBullhorn />, <FaRegLightbulb />, <FaExclamationTriangle />];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-3 rounded-lg shadow-lg">
              <IoMdNotifications className="text-white text-2xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">Announcement Board</h1>
              <p className="text-gray-600">Post and manage important announcements</p>
            </div>
          </div>
          <button 
            onClick={getData} 
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <IoMdRefresh className="mr-1" /> Refresh
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          {showSuccess}
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          {error}
        </div>
      )}

      {/* Announcement Form */}
      <div className="max-w-4xl mx-auto mb-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <form 
            className="flex items-center gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBullhorn className="text-gray-400" />
              </div>
              <textarea 
                required
                rows="1"
                value={notice}
                onChange={(e) => setNotice(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Enter new announcement here..."
              ></textarea>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-gray-400 text-xs">{notice.length} chars</span>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <IoMdSend className="mr-2" />
              Post
            </button>
          </form>
        </div>
      </div>

      {/* Announcements List */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            Recent Announcements
            {data.length > 0 && (
              <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium py-1 px-2 rounded-full">
                {data.length}
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-gray-600">Loading announcements...</p>
          </div>
        ) : data.length > 0 ? (
          <div className="space-y-4">
            {data.map((ele) => (
              <div 
                key={ele._id} 
                className="bg-white border-l-4 border-indigo-500 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          {getRandomIcon()}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">{ele.notice}</p>
                        <div className="mt-2 flex items-center text-xs text-gray-500">
                          <div className="flex items-center mr-4">
                            <IoMdCalendar className="mr-1" />
                            {ele.createdAt && formatDate(ele.createdAt)}
                          </div>
                          <div className="flex items-center">
                            <IoMdTime className="mr-1" />
                            {ele.createdAt && formatTime(ele.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(ele._id)}
                      className="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-300"
                      title="Delete announcement"
                    >
                      <IoMdTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-gray-300 rounded-lg p-12 text-center">
            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <IoMdNotifications className="text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">No announcements yet</h3>
            <p className="text-gray-500">Create your first announcement to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcement;