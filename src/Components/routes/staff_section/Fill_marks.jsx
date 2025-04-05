import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function Fill_marks() {
  const {id}=useParams();
  const navigate=useNavigate();
  const [data,setData]=useState({});
  const [marks,setmarks]=useState({
    sub1m:'',
    sub2m:'',
    sub3m:'',
    sub4m:'',
    sub5m:'',
    sub6m:'',
    sub7m:'',
  });


  const getData=async()=>{
   const res=await axios.get('https://college-backend-4-cgya.onrender.com/stud_exam_data',{params:{id}});
   setData(res.data)
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setmarks({...marks,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
   const res = axios.post('https://college-backend-4-cgya.onrender.com/create_result',{...data,...marks});
   alert("Result created");
   
  }

  useEffect(()=>{
    getData();
  },[])
  
  return (
    <>
    

    <div className="p-4 bg-gray-100 rounded-md shadow-md">
  <div className="text-xl mb-4">
    Student Details : <strong>{data.name} : {data.course}</strong> 
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <table className="w-full table-auto bg-white border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 px-4 border-b text-left">Subjects</th>
          <th className="py-2 px-4 border-b text-left">Fill marks</th>
        </tr>
      </thead>
      <tbody>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub1}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub1m"
              type="text"
              className="w-full px-3 py-1 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub2}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub2m"
              type="text"
              className="w-full px-3 border-gray-400 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub3}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub3m"
              type="text"
              className="w-full border-gray-400 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub4}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub4m"
              type="text"
              className="w-full border-gray-400 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub5}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub5m"
              type="text"
              className="w-full border-gray-400 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub6}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub6m"
              type="text"
              className="w-full border-gray-400 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
        <tr className="odd:bg-gray-50 even:bg-white">
          <td className="py-2 px-4 border-b">{data.sub7}</td>
          <td className="py-2 px-4 border-b">
            <input
              required
              onChange={handleChange}
              name="sub7m"
              type="text"
              className="w-full border-gray-400 px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" className="py-3 text-center">
            <input
              type="submit"
              value="Submit"
              className="transition border-gray-400 duration-500 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  </form>
</div>



    </>
  )
}

export default Fill_marks;