import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaFilm, FaSpinner } from 'react-icons/fa';

function Campus() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const skeleton = Array(8).fill(1);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
    setActiveVideo(index);
  };

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_videos');
      setVideos(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching videos:", error);
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
            <FaFilm className="inline-block mr-2 mb-1 text-red-700" />
            Campus Videos
          </h1>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skeleton.map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                <div className="h-48 bg-gray-200 animate-pulse flex items-center justify-center">
                  <FaSpinner className="text-gray-400 text-4xl animate-spin" />
                </div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div 
                key={video._id} 
                className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <video
                    ref={(element) => (videoRefs.current[index] = element)}
                    controls
                    className="w-full h-48 object-cover bg-black"
                    onPlay={() => handlePlay(index)}
                    poster={video.thumbnail || ""}
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {activeVideo !== index && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-red-600 bg-opacity-80 flex items-center justify-center cursor-pointer hover:bg-opacity-100 transition-all">
                        <FaPlay className="text-white text-2xl ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <h3 className="font-serif text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="bg-gray-200 px-3 py-1 rounded-full">Campus Life</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No videos available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Campus;
