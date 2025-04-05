import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Notice_staff() {

  const [data,setData]=useState([]);

  const getData=async()=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_notices');
    setData(res.data.reverse());
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className='m-4'>
  {
    data.length > 0 ? 
    data.map((ele) => {
      return (
        <div key={ele._id} className='bg-white p-5 mb-3 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300'>
          {ele.notice}
        </div>
      );
    }) 
    : 
    <div>
      Notification section is empty
    </div>
    
  }
</div>

  
  )
}

export default Notice_staff;