import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Add_blogs() {


  const [data,setData]=useState({
    'title':'',
    'description':''
  })
  const [file,setFile]=useState('');

  const [mainData,setMainData]=useState([]);
  const [change,setChange]=useState(true)

  const getData=async()=>{
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/get_blogs_data');
    setMainData(res.data);
  }


  useEffect(()=>{
    getData();
  },[change])

  async function handleDelete(id){
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/delete_blog_info',{id});
    setChange(prev=>!prev)
  }

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value})
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    const formData=new FormData();
    formData.append('title',data.title);
    formData.append('description',data.description);
    formData.append('file',file);
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/3000/add_blog',formData);
    setChange(prev=>!prev)
    
  }


  return (
  <>
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">

    <div className="bg-white p-8 rounded-lg shadow-lg">
        <center>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">Choose image for the blog</label>
                    <input required onChange={(e)=>setFile(e.target.files[0])}  id='photo' type="file" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <input required name='title' onChange={handleChange} placeholder='Title of the blog' type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <textarea required onChange={handleChange} rows='7' name='description' placeholder='Blog description' className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
                </div>
                <div>
                    <input type="submit" value="Add" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300" />
                </div>
            </form>
        </center>
    </div>
</div>

<div className="container mx-auto p-4">
  <center>
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Blogs</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mainData.map((item) => {
        return (
          <div
            key={item._id}
            className="relative bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={`${item.image}'s photo`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4 text-left">
              <p className="text-xl text-gray-700">
              <b className='text-black'>Blog Title :</b> <span className="text-gray-900">{item.title}</span>
              </p>
              <p className="text-lg text-gray-500 mt-2">
               <b className='text-black'>Description :</b>  <span>{item.description}</span>
              </p>
            </div>
            <button onClick={() => handleDelete(item._id)}
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

export default Add_blogs;