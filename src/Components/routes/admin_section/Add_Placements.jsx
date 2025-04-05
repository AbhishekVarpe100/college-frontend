import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Add_Placements() {



  const [data,setData]=useState({
    name:'',
    package_:'',
    company:'',
  })

  const [file,setFile]=useState('');

  const [mainData,setMainData]=useState([]);
  const [change,setChange]=useState(true)

  const getData=async()=>{
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/get_placements_data');
    setMainData(res.data);
  }


  useEffect(()=>{
    getData();
  },[change])


 async function handleDelete(id){
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/delete_placement_info',{id});
    setChange(prev=>!prev)
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value})
  }
  
  async function handleSubmit(e){
   e.preventDefault();
   const formData=new FormData();
   formData.append('name',data.name);
   formData.append('package_',data.package_);
   formData.append('file',file);
   formData.append('company',data.company);
   const res=await axios.post('https://college-backend-4-cgya.onrender.com/create_placement',formData);
   setChange(prev=>!prev)

  }


  return (
    <>
  <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <center>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
              Choose photo of candidate
            </label>
            <input
              required
              onChange={(e) => setFile(e.target.files[0])}
              id="photo"
              type="file"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              required
              name="name"
              onChange={handleChange}
              placeholder="Name of a candidate"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              required
              name="package_"
              onChange={handleChange}
              placeholder="Package"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
          <input
              required
              name="company"
              onChange={handleChange}
              placeholder="Company name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="submit"
              value="Add"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            />
          </div>
        </form>
      </center>
    </div>
  </div>

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
            <button onClick={()=>handleDelete(item._id)}
              className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  </center>
</div>

</>

  )
}

export default Add_Placements;