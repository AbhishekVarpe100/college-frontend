import React, { useEffect, useState } from 'react';
import './css/Loader.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiUploadCloud } from "react-icons/fi";
import { MdDelete, MdEdit } from "react-icons/md";

function ProfilePhoto() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const type = localStorage.getItem('type');
  const [data, setData] = useState({});
  const [th, getTh] = useState(localStorage.getItem('theme'));

  const handleDelete = async (id, type, photo) => {
    const res = await axios.post('https://college-backend-4-cgya.onrender.com/delete_photo', { id, type, photo });
    if (res.data) {
      window.location.reload();
    }
  }

  const handleDeleteAcc = async (id, type) => {
    const res = await axios.get('https://college-backend-4-cgya.onrender.com/delete_info', { params: { id, type } });
    if (res.data) {
      navigate('/login');
      localStorage.clear();
    }
  }

  const dataObj = {
    username,
    email,
    type,
  }

  async function getData() {
    const response = await axios.post('https://college-backend-4-cgya.onrender.com/getprofile_data', dataObj);
    setData(response.data);
  }

  useEffect(() => {
    getData();
    setTimeout(() => setLoader(false), 3000);
  }, []);

  return (
    <>
      {loader ? (
        <div className='p-10 flex justify-center items-center min-h-screen'>
          <div className='lds-roller'>
            <div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div>
          </div>
        </div>
      ) : (
        <div className={`${th === 'dark' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} py-12 min-h-screen font-serif`}>
          <section className={`p-8 rounded-xl shadow-lg max-w-lg mx-auto border ${th === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>

            <div className="flex flex-col items-center">
              <img
                src={!data.photo
                  ? 'http://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                  : `${data.photo}`}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-gray-300 object-cover shadow-md mb-5"
              />

              {!data.photo ? (
                <Link
                  to={`/profile_img/upload/${data._id}/${type}`}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                >
                  <FiUploadCloud size={20} />
                  <span>Upload Photo</span>
                </Link>
              ) : (
                <div className="flex space-x-4 mb-4">
                  <Link
                    to={`/profile_img/edit/${data._id}/${type}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                    title="Edit Photo"
                  >
                    <MdEdit size={20} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id, type, data.photo)}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 transition"
                    title="Delete Photo"
                  >
                    <MdDelete size={20} />
                    Delete
                  </button>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="text-xl font-semibold">{data.username}</p>
                <p className="text-gray-600 dark:text-gray-300">{data.email}</p>

                <div className="mt-6 space-y-3">
                  <Link
                    to={`/profile_img/edit_info/${data._id}/${type}`}
                    className="inline-block w-full text-center bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                  >
                    Edit Info
                  </Link>
                  <button
                    onClick={() => handleDeleteAcc(data._id, type)}
                    className="w-full bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
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
