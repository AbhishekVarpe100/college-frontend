import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FiUpload, FiVideo, FiTrash2, FiPlay, FiFileText, FiLoader } from 'react-icons/fi';

function Add_Videos() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState([]);
  const [change, setChange] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const videoRefs = useRef([]);
  
  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/add_video', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      alert(res.data.message);
      setTitle('');
      setFile('');
      setProgress(0);
      setChange(!change);
    } catch (error) {
      alert('Error uploading video. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  }

  useEffect(() => {
    getData();
  }, [change]);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete('https://college-backend-4-cgya.onrender.com/delete_video', { data: { id } });
        setChange(!change);
      } catch (error) {
        alert('Error deleting video. Please try again.');
      }
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-center">Classic Video Library</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Upload Form */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4">
              <h2 className="text-xl font-serif flex items-center justify-center">
                <FiUpload className="mr-2" /> Add New Video
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Video File</label>
                <div className="relative border border-gray-300 rounded-md p-3 bg-gray-50">
                  <input
                    required
                    id="file-upload"
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    accept="video/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center text-gray-500">
                    <FiVideo className="mr-2 text-lg" />
                    <span>{file ? file.name : 'Select a video file...'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Video Title</label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <span className="bg-gray-100 p-3 border-r border-gray-300">
                    <FiFileText className="text-gray-500" />
                  </span>
                  <input
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Enter video title"
                    className="flex-1 p-3 focus:outline-none"
                  />
                </div>
              </div>
              
              {progress > 0 && (
                <div className="mb-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-sm mt-2 text-gray-600">{progress}% Uploaded</div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 transition duration-300 flex items-center justify-center"
              >
                {isUploading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" /> Uploading...
                  </>
                ) : (
                  <>
                    <FiUpload className="mr-2" /> Upload Video
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Video Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold text-center mb-6 pb-2 border-b-2 border-gray-300">
            <FiVideo className="inline-block mr-2" /> Video Collection
          </h2>
          
          {videos.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No videos have been uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div key={video._id} className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={(element) => (videoRefs.current[index] = element)}
                      controls
                      className="w-full h-full object-contain"
                      onPlay={() => handlePlay(index)}
                    >
                      <source src={video.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <FiPlay className="text-white text-6xl" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif font-medium text-lg truncate" title={video.title}>
                        {video.title}
                      </h3>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="text-red-600 hover:text-red-800 p-2 transition-colors duration-300"
                        title="Delete video"
                      >
                        <FiTrash2 />
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

export default Add_Videos;
