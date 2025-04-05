import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
function UploadPhoto() {
    const {id,type}=useParams();    
    const  [file,setFile]=useState('');
    const [fileName, setFileName] = useState('');
    const navigate=useNavigate();

    const handleUpload=async (e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('id',id);
        formData.append('type',type);
        formData.append('file',file);
        const res=await axios.post('https://college-backend-4-cgya.onrender.com/upload_photo',formData);
        if(res.data=='uploaded'){
            navigate('/profile_img')
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          setFile(selectedFile);
          setFileName(selectedFile.name);
        }   
      };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
          <center className="mb-6">
            <h1 className="text-xl font-medium text-gray-700 mb-4">Upload Your File </h1>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center w-full h-32 border-2 border-dashed border-gray-300 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition duration-500 ease-in-out">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg className="w-10 h-10 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16v-4a4 4 0 014-4h.01a4 4 0 014 4v4m1 4h-10a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">Select a file</p>
                  </div>
                  <input type="file" required className="opacity-0" onChange={handleFileChange} />
                </label>
              </div>

              {fileName && (
                <p className="text-sm text-gray-500 mt-2">Selected File: {fileName}</p>
              )}

              <input
                type="submit"
                value="Upload"
                className="w-full cursor-pointer bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition duration-150 ease-in-out"
              />
              <button onClick={()=>navigate('/profile_img')} className="w-full cursor-pointer bg-red-700 text-white py-2 rounded hover:bg-red-800 transition duration-150 ease-in-out">Cancel</button>
            </form>
          </center>
        </div>
      </div>
  )
}

export default UploadPhoto;