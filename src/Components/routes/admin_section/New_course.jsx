import React, { useEffect, useState } from 'react'
import axios from 'axios';
function New_course() {

  const [courseName,setCourseName]=useState('');
  const [fees,setFees]=useState('');
  const [perYearFees,setPerYearFees]=useState('');
  const [data,setData]=useState([]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res= await axios.post('https://college-backend-4-cgya.onrender.com/add_course',{courseName,fees,perYearFees})
    alert(res.data);
    setCourseName("");
    setFees("");
    setPerYearFees("");
  }

  const handleDelete=async (id)=>{
    const res=await axios.delete(`https://college-backend-4-cgya.onrender.com/delete_course/${id}`)
    alert(res.data)
  }

  const getData=async ()=>{
    let res=await axios('https://college-backend-4-cgya.onrender.com/get_courses');
    setData(res.data)
  }
  useEffect(()=>{
    getData();
  })

  return (
    <>
    <div className='p-10 max-w-md mx-auto'>
  <form onSubmit={handleSubmit} className="space-y-4">
    <header className='text-slate-500 text-lg font-semibold mb-4'>Add New Course</header>
    <input required value={courseName}
        onChange={(e) => setCourseName(e.target.value)} 
        type="text" 
        placeholder="Enter course name" 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
    />
    <input required value={fees}
        onChange={(e) => setFees(e.target.value)} 
        type="text" 
        placeholder="Enter total course fees" 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
    />
    <input required value={perYearFees}
        onChange={(e) => setPerYearFees(e.target.value)} 
        type="text" 
        placeholder="Enter per year fees" 
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" 
    />
    <input 
        type="submit" 
        value="Add Course" 
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 cursor-pointer" 
    />
  </form>
</div>

{data.length > 0 ? (
  <div className="overflow-x-auto p-4">
    <div> <b>Total courses: {data.length}</b> </div>
    <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
      <thead>
        <tr className="bg-indigo-600 text-white text-sm">
          <th className="px-4 py-3 text-left border-b border-indigo-400">Course Name</th>
          <th className="px-4 py-3 text-left border-b border-indigo-400">Total Course Fees</th>
          <th className="px-4 py-3 text-left border-b border-indigo-400">Per Year Fees</th>
          <th className="px-4 py-3 text-left border-b border-indigo-400">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id} className="hover:bg-gray-200 transition duration-300 text-sm">
            <td className="px-4 py-2 border-b border-gray-200">{item.course_name}</td>
            <td className="px-4 py-2 border-b border-gray-200">{item.fees}</td>
            <td className="px-4 py-2 border-b border-gray-200">{item.perYearFees}</td>
            <td className="px-4 py-2 border-b border-gray-200">
              <button 
                onClick={() => handleDelete(item._id)} 
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full text-sm transition duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="flex items-center justify-center h-48">
    <p className="text-gray-500 text-lg">No courses available</p>
  </div>
)}

    </>
  )
}

export default New_course;