import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Placements() {


  const [mainData,setMainData]=useState([]);


  const getData=async()=>{
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/get_placements_data');
    setMainData(res.data);
  }


  useEffect(()=>{
    getData();
  },[])

  return (
    <div>

<div className="container mx-auto p-4">
  <center>
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Placed Students</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mainData.map((item) => {
        return (
          <div
            key={item.name}
            className="relative bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:shadow-2xl"
          >
            <img
              src={item.photo}
              alt={`${item.name}'s photo`}
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
            <div className="mt-4 text-left">
              <p className="text-xl font-semibold text-gray-700">
                Student Name : <span>{item.name}</span>
              </p>
              <p className="text-lg text-gray-500">
                Package : <span>{item.package_}</span>
              </p>
              <p className="text-lg text-gray-500">
                Company : <span>{item.company}</span>
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

export default Placements;