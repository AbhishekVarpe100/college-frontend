import React, { useEffect, useState } from 'react'
import axios from 'axios';
function All_Admissions() {

  const [ad_data,setAdData]=useState([]);

  const getAdmissionData=async()=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_admission_data_all'); 
    setAdData(res.data.admission_data);
  }

  const handleApprove=async(id)=>{
    await axios.put('https://college-backend-4-cgya.onrender.com/approve',{id});
  }

  const handleNotApprove=async (id)=>{
    await axios.put('https://college-backend-4-cgya.onrender.com/not_approve',{id});
  }

  useEffect(()=>{
    getAdmissionData();
  })


  return (
    <div>

{ad_data.length > 0 ? (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">All Data</h1>
    {ad_data.map((item) => {
      return (
        <div
          key={item._id}
          className="border p-4 mb-4 rounded-lg shadow-md bg-white"
        >
        <strong>Username  </strong>  <p className="text-gray-700 font-medium">{item.username}</p>
        <strong>Email  </strong>   <p className="text-gray-600">{item.email}</p>
        <strong>Full name  </strong>   <p className="text-gray-600">{item.name}</p>
        <strong>Applied course name  </strong>   <p className="text-gray-600">{item.course}</p>
        <strong>10th percentage  </strong>   <p className="text-gray-600">{item.percent_10th} %</p>
        <strong>12th percentage  </strong>   <p className="text-gray-600">{item.percent_12th} %</p>
         
        {item.status=='approve'? <>Approved</> :  <button
  onClick={() => handleApprove(item._id)}
  className="mt-2 mx-2 border border-blue-600 font-bold transition duration-300 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white"
>
  Approved
</button> } 

{item.status=='not_approve'? <>Not approved</> : <button
  onClick={() => handleNotApprove(item._id)}
  className="mt-2 mx-2 border border-red-600 font-bold transition duration-300 text-red-600 px-4 py-2 rounded hover:bg-red-600 hover:text-white"
>
  Not approved
</button>}
        </div>
      );
    })}
  </div>
) : (
  <div className="text-center text-gray-500 m-10">No data found</div>
)}
    </div>
  )
}

export default All_Admissions;