import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Add_Videos() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      alert('Please select a video file');
      return;
    }
    
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
      setFile(null);
      setFileName('');
      setProgress(0);
      setChange(!change); // Trigger refetch
    } catch (error) {
      alert('Failed to upload video: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  }

  const getData = async () => {
    try {
      const res = await axios.post('https://college-backend-4-cgya.onrender.com/get_videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  useEffect(() => {
    getData();
  }, [change]);

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await axios.delete('https://college-backend-4-cgya.onrender.com/delete_video', { data: { id } });
        setChange(!change); // Trigger refetch
      } catch (error) {
        alert('Failed to delete video: ' + (error.response?.data?.message || error.message));
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Upload Section with Classic Professional Look */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-900 px-6 py-4">
            <h2 className="text-xl font-serif font-bold text-white flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              Upload New Video
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Video Title Input */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video-title">
                  Video Title
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <input
                    id="video-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none"
                    placeholder="Enter a descriptive title"
                    required
                  />
                </div>
              </div>
              
              {/* File Selection - Clean Professional Look */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
                  Select Video File
                </label>
                <div className="flex items-center">
                  <label htmlFor="file-upload" className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md shadow-sm transition-colors duration-200 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    Browse Files
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="sr-only"
                      required
                    />
                  </label>
                  <span className="ml-3 text-sm text-gray-500 truncate max-w-xs">
                    {fileName ? fileName : "No file selected"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">MP4, MOV, or WebM files up to 100MB</p>
              </div>
              
              {/* Progress Bar */}
              {progress > 0 && (
                <div className="md:col-span-2 mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <span className="text-sm font-medium text-blue-600">{progress}%</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={isUploading}
                className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors duration-200`}
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 -ml-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    Upload Video
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Video Gallery Section - Classic and Professional */}
      <div className="container mx-auto px-4 py-10 mb-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl text-center font-serif font-bold text-gray-800 inline-flex items-center border-b-2 border-blue-500 pb-2">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              Video Collection
            </h2>
          </div>
          
          {videos.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-md">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No videos available</h3>
              <p className="text-gray-500">Upload your first video to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <div key={video._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video bg-black">
                    <video
                      ref={(element) => { videoRefs.current[index] = element; }}
                      className="w-full h-full object-contain"
                      controls
                      preload="metadata"
                      onPlay={() => handlePlay(index)}
                      key={video._id}
                    >
                      <source src={`${video.video}?${new Date().getTime()}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900 truncate" title={video.title}>
                        {video.title}
                      </h3>
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
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
