import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Exam(){

    const [data,setData]=useState([]);
    const [change,setChange]=useState(false);

    const getData=async()=>{
       const res= await axios.get('http://localhost:3000/get_exam_data') ;
       setData(res.data)
       setChange(prev=>!prev);
    }

    const handleRelease=async(id)=>{
     const res=await axios.post('http://localhost:3000/release_hallticket',{id});
        setChange(prev=>!prev);
    }

    useEffect(()=>{
        getData();
    },[])



    return (
        <>

<div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Exam Data</h1>
            {data.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-2 border-b border-gray-200">Student Name</th>
                                <th className="p-2 border-b border-gray-200">Course Name</th>
                                <th className="p-2 border-b border-gray-200">PRN No.</th>
                                <th className="p-2 border-b border-gray-200">Subject 1</th>
                                <th className="p-2 border-b border-gray-200">Subject 2</th>
                                <th className="p-2 border-b border-gray-200">Subject 3</th>
                                <th className="p-2 border-b border-gray-200">Subject 4</th>
                                <th className="p-2 border-b border-gray-200">Subject 5</th>
                                <th className="p-2 border-b border-gray-200">Practical 1</th>
                                <th className="p-2 border-b border-gray-200">Practical 2</th>
                                <th className="p-2 border-b border-gray-200">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="p-2 border-b border-gray-200">{item.name}</td>
                                    <td className="p-2 border-b border-gray-200">{item.course}</td>
                                    <td className="p-2 border-b border-gray-200">{item.prn}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub1}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub2}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub3}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub4}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub5}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub6}</td>
                                    <td className="p-2 border-b border-gray-200">{item.sub7}</td>

                                    {item.hallticket_status? <div className='bg-blue-500 text-white '>Hallticket released</div>:<button onClick={()=>handleRelease(item._id)} className='bg-red-500 text-white hover:bg-red-600 transition duration-500'>Relese Hallticket</button>} 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No data found</p>
            )}
        </div>
        </>
    )
}

export default Exam;