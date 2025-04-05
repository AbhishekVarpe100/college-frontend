import React, { useEffect, useState } from 'react'
import axios from 'axios';
function Notices() {

  const [data,setData]=useState([]);
  const [th,getTh]=useState(localStorage.getItem('theme'));

  const getData=async()=>{
    const res=await axios.get('http://localhost:3000/get_notices');
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
        <div key={ele._id} className={` rounded-xl ${th=='dark'? 'bg-black text-white':'bg-gray-200 text-black'} p-5 mb-3`}>
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

export default Notices;