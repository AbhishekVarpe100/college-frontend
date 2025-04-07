import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookOpen, FaSpinner, FaUser } from 'react-icons/fa';

function Blogs() {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = Array(6).fill(1);

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_blogs_data');
      setMainData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800 border-b-2 border-gray-300 pb-4 inline-block">
            <FaBookOpen className="inline-block mr-2 mb-1 text-red-700" />
            Campus Blogs
          </h1>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeleton.map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainData.length > 0 ? (
              mainData.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={`${item.title}`}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x200?text=Blog+Image";
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-red-700 text-white px-3 py-1 text-sm font-semibold">
                      Featured
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                      <FaUser className="mr-1" />
                      <span>Campus Writer</span>
                    </div>
                    
                    <h2 className="font-serif text-xl font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-2">
                      {item.title}
                    </h2>
                    
                    <div className="text-gray-600 mt-2 blog-content">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600 text-lg">No blog posts available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
