import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FaPlay, FaPause, FaVideo } from 'react-icons/fa';
import { BiLoaderCircle } from 'react-icons/bi';

function Campus() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(null);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
    setPlayingIndex(index);
  };

  const handlePause = () => {
    setPlayingIndex(null);
  };

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_videos');
      setVideos(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Campus Videos
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500">
            Explore our collection of campus highlights and educational content
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="animate-pulse">
                  <div className="bg-gray-300 h-64 w-full flex items-center justify-center">
                    <BiLoaderCircle className="text-gray-400 w-16 h-16 animate-spin" />
                  </div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div 
                key={video._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  <video
                    ref={(element) => (videoRefs.current[index] = element)}
                    className="w-full h-64 object-cover"
                    onPlay={() => handlePlay(index)}
                    onPause={handlePause}
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play indicator overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30">
                    {playingIndex === index ? (
                      <FaPause className="text-white text-opacity-0 w-16 h-16" />
                    ) : (
                      <FaPlay className="text-white text-opacity-0 w-16 h-16" />
                    )}
                  </div>
                  
                  {/* Video controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center">
                      <button 
                        onClick={() => {
                          const video = videoRefs.current[index];
                          if (video.paused) {
                            video.play();
                          } else {
                            video.pause();
                          }
                        }}
                        className="bg-white bg-opacity-90 rounded-full p-2 mr-2 shadow hover:bg-opacity-100 focus:outline-none transition"
                      >
                        {playingIndex === index ? (
                          <FaPause className="text-gray-800 w-4 h-4" />
                        ) : (
                          <FaPlay className="text-gray-800 w-4 h-4" />
                        )}
                      </button>
                      <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm text-gray-800 font-medium">
                        {video.duration || "00:00"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {video.description || "No description available"}
                      </p>
                    </div>
                    <FaVideo className="text-indigo-500 w-5 h-5 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && videos.length === 0 && (
          <div className="text-center py-16">
            <FaVideo className="mx-auto text-gray-400 w-16 h-16" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No videos available</h3>
            <p className="mt-2 text-gray-500">Check back later for updated content.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Campus;
