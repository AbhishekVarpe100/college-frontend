import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function Campus() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [skeleton,setSkeleton]=useState([1,1,1,1,1,1,1,1])
  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
  };

  const getData = async () => {
    const res = await axios.post('http://localhost:3000/get_videos');
    setVideos(res.data);
  };

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(true);
    }, 4000);
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-8 py-4">Videos</h1>
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          videos.map((video, index) => (
            <div key={video._id} className="flex flex-col hover:shadow-2xl items-center p-4 rounded-lg shadow-md transition duration-500">
              <video
                ref={(element) => (videoRefs.current[index] = element)}
                controls
                className="w-full h-64 rounded-md mb-4"
                onPlay={() => handlePlay(index)}
              >
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="flex">
                <div className="mr-16">
                  <strong>Title:</strong> {video.title}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
          {skeleton.map(item=>(
            <Box sx={{ pt: 0.5 }}>
            <Skeleton variant="rectangular" width="100%" height={250} />
            <Skeleton width="60%" />
          </Box>
          ))}
            
          </>
        )}
      </div>
    </div>
  );
}

export default Campus;
