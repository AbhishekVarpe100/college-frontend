import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBriefcase, FaBuilding, FaUserGraduate, FaSpinner, FaRupeeSign } from 'react-icons/fa';

function Placements() {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(true);
  const skeleton = Array(6).fill(1);

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_placements_data');
      setMainData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching placement data:", error);
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
            <FaBriefcase className="inline-block mr-2 mb-1 text-red-700" />
            Placement Success Stories
          </h1>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeleton.map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-6 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                <div className="w-full">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainData.length > 0 ? (
              mainData.map((item) => (
                <div
                  key={item.name}
                  className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-gray-50 p-6 flex flex-col items-center border-b border-gray-200">
                    <div className="relative mb-4">
                      <div className="w-32 h-32 rounded-full bg-red-700 bg-opacity-10 p-1">
                        <img
                          src={item.photo}
                          alt={`${item.name}`}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/150?text=Student";
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center">
                        <FaUserGraduate />
                      </div>
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-gray-800">
                      {item.name}
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <div className="flex items-center text-gray-700">
                        <FaBuilding className="mr-2 text-red-700" />
                        <span className="font-medium">Company:</span>
                        <span className="ml-2">{item.company}</span>
                      </div>
                    </div>
                    
                    <div className="mb-1">
                      <div className="flex items-center text-gray-700">
                        <FaRupeeSign className="mr-2 text-red-700" />
                        <span className="font-medium">Package:</span>
                        <span className="ml-2 font-semibold text-green-700">{item.package_}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-4 pt-0">
                    <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Class of {new Date().getFullYear()}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600 text-lg">No placement data available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Placements;
