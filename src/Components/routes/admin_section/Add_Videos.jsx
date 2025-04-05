import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Add_Videos() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [videos,setVideos]=useState([]);
  const [change,setChange]=useState(true);

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    const res = await axios.post('http://localhost:3000/add_video', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      },
    });

    alert(res.data.message);
  }


  const getData=async()=>{
    const res=await axios.post('http://localhost:3000/get_videos');
    setVideos(res.data);
    change?setChange(false):setChange(true)
  }

  useEffect(()=>{
    getData();
  },[change])

  async function handleDelete(id){
  const res=await axios.delete('http://localhost:3000/delete_video',{data:{id}});
  change?setChange(false):setChange(true)
  }

  return (

    <>
    <div className="flex bg-white items-center justify-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Add Video</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              required
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title of the video"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <progress
              value={progress}
              max="100"
              className="w-full h-4 bg-green-500 rounded-md"
            ></progress>
            <div className="text-center text-sm mt-1">{progress? `${progress}%`:<></>}</div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add Video
          </button>
        </form>
      </div>
    </div>

    <h1 className="text-3xl text-center font-bold text-gray-800 mb-8 py-4">Videos</h1>


    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, index) => (
        <div key={video._id} className="flex flex-col hover:shadow-xl items-center p-4 rounded-lg shadow-md">
          <video
            ref={(element) => (videoRefs.current[index] = element)}
            controls
            className="w-full h-64 rounded-md mb-4"
            onPlay={() => handlePlay(index)}
          >
            <source src={video.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

<div className='flex'>
          <div className='mr-16'> <strong>Title : </strong>{video.title}</div>
          <span><button onClick={()=>handleDelete(video._id)}
            className="bg-red-500 text-white px-4 py-2 ml-16 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Delete
          </button></span>
</div>


        </div>
      ))}
    </div>
    

    </>
  );
}

export default Add_Videos;
