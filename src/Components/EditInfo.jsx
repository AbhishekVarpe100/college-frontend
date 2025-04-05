import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function EditInfo() {


    const username=useSelector((state)=>state.username);
    const email=useSelector((state)=>state.email);
    // const type=localStorage.getItem('type');
    const navigate=useNavigate();
    
    const {id,type}=useParams();

    const [newUsername,setNewUsername]=useState('');
    const [newEmail,setNewEmail]=useState('');

    const newData={
        id:id,
        username:newUsername,
        email:newEmail,
        type:type
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res=await axios.post('https://college-backend-4-cgya.onrender.com/edit_info',newData)
        if(res.data){
            localStorage.setItem('email',newEmail);
            localStorage.setItem('username',newUsername);
            navigate('/profile_img');
        }

    }

    const dataObj={
        username:username,
        email:email,
        type:type,
      }

      
      async function getData(){
          const response=await axios.post('https://college-backend-4-cgya.onrender.com/getprofile_data',dataObj);
          setNewUsername(response.data.username)
          setNewEmail(response.data.email)
      }
    
      useEffect(() => {
        getData();
      }, []);

  return (
    <div className='p-8 bg-gray-100 m-40 rounded-lg shadow-md max-w-lg mx-auto'>
 
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setNewUsername(e.target.value)}
          value={newUsername}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new username"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="text"
          id="email"
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new email"
        />
      </div>
      <div>
        <input
          type="submit"
          value="Edit"
          className="bg-green-500 m-2 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
        />
        <button onClick={()=>navigate('/profile_img')} className="bg-red-500 m-2 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition-colors">Cancel</button>
      </div>
    </form>
  
</div>

  )
}

export default EditInfo;