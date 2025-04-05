import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Add_Subjects() {

    const [sub,setSub]=useState('');
    const [marks,setMarks]=useState('');
    const [subData,setSubData]=useState([]);
    const [render,setRender]=useState(false)
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await axios.post('https://college-backend-4-cgya.onrender.com/add_sub',{sub,marks})
        if(res){
            alert("Added")
            setSub("");
            setMarks("");
            setRender(prev=>!prev)
        }
    }

    const getSubData=async()=>{
        
            const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_sub_data');
            setSubData(res.data)
        
    }

    const handleDelete=async (id)=>{
       const res= await axios.delete(`https://college-backend-4-cgya.onrender.com/delete_sub/${id}`);
        alert("Deleted")
        if(res){
            setRender(prev=>!prev)
        }

    }


    useEffect(()=>{
        getSubData();
    },[render])

  return (
    <div>

    <div className="p-4 bg-gray-200 m-6 rounded-lg max-w-md">
       <center><b className='opacity-50 text-center'>Add subject</b></center> 
    <form onSubmit={handleSubmit} className="mb-4">
        <input value={sub} required
            onChange={(e) => setSub(e.target.value)} 
            type="text" 
            placeholder="Enter subject name" 
            className="w-full p-2 mb-2 border rounded-lg text-sm"
        />
        <input value={marks} required
            onChange={(e) => setMarks(e.target.value)} 
            type="text" 
            placeholder="Enter total marks" 
            className="w-full p-2 mb-2 border rounded-lg text-sm"
        />
        <input 
            type="submit" 
            value="Add" 
            className="w-full p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 text-sm"
        />
    </form>

    </div>

    {subData.length > 0 ? (
        <> Total subjects : {subData.length}
        <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-2 text-sm">Subject Name</th>
                    <th className="p-2 text-sm">Marks</th>
                    <th className="p-2 text-sm">Actions</th>
                </tr>
            </thead>
            <tbody>
                {subData.map((sub) => (
                    <tr key={sub._id} className="border-b hover:bg-slate-200 transition duration-200">
                        <td className="p-2 text-sm">{sub.sub_name}</td>
                        <td className="p-2 text-sm">{sub.marks}</td>
                        <td className="p-2 text-sm">
                            <button 
                                onClick={() => handleDelete(sub._id)} 
                                className="p-1 font-bold bg-red-500 text-white transition duration-500 rounded-lg hover:bg-white border hover:border-red-400 hover:text-red-500  text-xs"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table> 
        </>
    ) : (
        <div className="text-center text-gray-500">No subjects found / error : <b>404</b> </div>
        
    )}
</div>

  )
}

export default Add_Subjects;
