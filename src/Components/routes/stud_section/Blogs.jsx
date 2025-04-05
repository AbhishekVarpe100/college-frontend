import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Blogs() {


  const [mainData,setMainData]=useState([]);

  const getData=async()=>{
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/get_blogs_data');
    setMainData(res.data);
  }


  useEffect(()=>{
    getData();
  },[])
  return (
    <div>
      <div className="container mx-auto p-4">
  <center>
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Blogs</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mainData.map((item) => {
        return (
          <div
            key={item._id}
            className="relative bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={`${item.image}'s photo`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4 text-left">
              <p className="text-xl text-gray-700">
              <b className='text-black'>Blog Title :</b> <span className="text-gray-900">{item.title}</span>
              </p>
              <p className="text-lg text-gray-500 mt-2">
               <b className='text-black'>Description :</b>  <span>{item.description}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </center>
</div>
    </div>
  )
}

export default Blogs;