import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { IoIosAddCircle } from "react-icons/io";
function Announcement() {

    const [notice,setNotice]=useState('');
    const [data,setData]=useState([]);
    const [change,setChange]=useState(true)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await axios.post('https://college-backend-4-cgya.onrender.com/create_notice',{notice});
        change? setChange(false):setChange(true);
        
    }


    const handleDelete=async (id)=>{
     const res= await axios.post('https://college-backend-4-cgya.onrender.com/delete_notice',{id})
      change? setChange(false):setChange(true);
    }

    const getData=async()=>{
      const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_notices');
      setData(res.data.reverse());
      // console.log(res.data)
    }

    useEffect(()=>{
      getData();
    },[])

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
  <form
    className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md flex items-center space-x-4"
    onChange={(e) => setNotice(e.target.value)}
    onSubmit={handleSubmit}
  >
    <textarea required
      rows="1"
      className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter the announcement"
    ></textarea>
    <button
      type="submit"
      className=" text-4xl bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer flex items-center justify-center"
    >
      <IoIosAddCircle></IoIosAddCircle>
    </button>
  </form>
  <div className="w-full max-w-3xl mt-6">
  
    
  {data.length>0?
  
  data.map((ele) => (
    <div key={ele._id}>
      <span></span>
      <div className="bg-blue-100 hover:bg-blue-200 transition duration-500 border-t-4 m-4 border-blue-500 rounded-b  px-4 py-3 shadow-xl" role="alert">
  <div className="flex">
    <div>
      <p className="font-bold">{ele.notice}</p>
      <button
  className="bg-violet-700 hover:bg-violet-600 text-white font-bold py-1 px-3 rounded-full transition duration-300"
  onClick={() => handleDelete(ele._id)}
>

  Delete
</button>

      {/* <p className="text-sm">Additional details and information.</p> */}
    </div>
  </div>
</div>

      
    </div>
  ))

  :<>Notification section is empty</>
}


  
</div>

    
  </div>
  )
}

export default Announcement;