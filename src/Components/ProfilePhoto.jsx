import React, { useEffect, useState } from 'react';
import './css/Loader.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function ProfilePhoto() {
  const navigate=useNavigate();
  const [loader, setLoader] = useState(true);
  const username=useSelector((state)=>state.username);
  const email=useSelector((state)=>state.email);
  const type=localStorage.getItem('type');
  const [data,setData]=useState({});
  const [th,getTh]=useState(localStorage.getItem('theme'));

  const  handleDelete=async(id,type,photo)=>{
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/delete_photo',{id,type,photo})
    if(res.data){
      window.location.reload();
    }
  }

  const handleDeleteAcc=async(id,type)=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/delete_info', {params :{id,type}})
    if(res.data){
      navigate('/login');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('type');
      localStorage.removeItem('token');
      localStorage.removeItem('token_expires_in');
    }
  }

  const dataObj={
    username:username,
    email:email,
    type:type,
  }

  async function getData(){
      const response=await axios.post('https://college-backend-4-cgya.onrender.com/getprofile_data',dataObj);
      setData(response.data)
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, []);

  return (
    <>
      {loader ? (
        <div className='p-10'>
          <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>     
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'} p-10`}>
    
        <section className={`text-2xl ${th=='dark'? 'bg-gray-600 text-black':'bg-white text-black'} text-lg p-6  rounded-lg shadow-2xl max-w-md mx-auto`} >
        <h1 className={`text-2xl ${th=='dark'? 'text-white':'bg-white text-black'} text-lg`}  >Your Profile</h1>
  <div className="flex flex-col items-center">
    <img
      src={!data.photo ? 'http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' : `${data.photo}`}
      alt="Profile"
      className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover mb-4"
    />
    {!data.photo ? (
      <Link
        to={`/profile_img/upload/${data._id}/${type}`}
        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        <FiUploadCloud title='upload photo'></FiUploadCloud>
      </Link>
    ) : (
      <div className="flex space-x-4 mb-4">
        <Link
          to={`/profile_img/edit/${data._id}/${type}`}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          <MdEdit title='edit photo'></MdEdit>
        </Link>
        <button
          onClick={() => handleDelete(data._id, type, data.photo)}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          <MdDelete title='delete photo'></MdDelete>
        </button>
      </div>
    )}
    <div className="text-center">
      <strong className={`text-xl ${th=='dark'? 'text-white':' text-black'} text-lg`}>{data.username}</strong>
      <br />
      <strong className={`text-xl ${th=='dark'? 'text-white':' text-black'} text-lg`}>{data.email}</strong>
      <div className="mt-4 space-y-2">
        <Link
          to={`/profile_img/edit_info/${data._id}/${type}`}
          className="bg-blue-600 hover:bg-blue-500 text-white m-4 px-4 py-2 rounded-lg"
        >
          Edit Info
        </Link>
        <button
          onClick={() => handleDeleteAcc(data._id, type)}
          className="bg-red-600 hover:bg-red-500 text-white m-4 px-4 py-1 rounded-lg"
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
</section>


        </div>
      )}
    </>
  );
}

export default ProfilePhoto;
