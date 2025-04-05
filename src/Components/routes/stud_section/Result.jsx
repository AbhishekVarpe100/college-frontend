import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Result() {

  const [data,setData]=useState([]);
  const [change,setChange]=useState(false);
  const [prn,setPrn]=useState(0);
  const [th,getTh]=useState(localStorage.getItem('theme'));
  const handleSubmit=async(e)=>{
    e.preventDefault();
   const res=await axios.get('http://localhost:3000/get_result',{params:{prn}});
   setData(res.data.data);
   setChange(prev=>!prev);
  }



  const handleDownload = async (file,username) => {
    try {
      const response = await axios({
        url: 'http://localhost:3000/download_result',
        method: 'GET',
        responseType: 'blob', // Important
        params:{file}
      });
  
      // Create a link element, set its href to the blob URL, and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${username}_result.pdf`); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  }



  useEffect(()=>{
  handleSubmit();
  console.log(data)
  },[change])

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
  <form onSubmit={handleSubmit} className="mb-6">
    <input
      onChange={(e) => setPrn(e.target.value)}
      type="text"
      placeholder="Enter your PRN no"
      className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="submit"
      value="See result"
      className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 cursor-pointer"
    />
  </form>

  {data.length > 0 ? (
    <>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <td className="p-3 border">Student Name : {data[0].username}</td>
          </tr>
          <tr>
            <td className="p-3 border">Course name : {data[0].course}</td>
          </tr>
          <tr>
            <td className="p-3 border">PRN No. : {data[0].prn}</td>
          </tr>
          <tr className="bg-gray-300">
            <th className="p-3 border">Subjects</th>
            <th className="p-3 border">Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub1}</td>
            <td className="p-3 border">{data[0].sub1m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub2}</td>
            <td className="p-3 border">{data[0].sub2m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub3}</td>
            <td className="p-3 border">{data[0].sub3m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub4}</td>
            <td className="p-3 border">{data[0].sub4m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub5}</td>
            <td className="p-3 border">{data[0].sub5m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub6}</td>
            <td className="p-3 border">{data[0].sub6m}</td>
          </tr>
          <tr className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>
            <td className="p-3 border">{data[0].sub7}</td>
            <td className="p-3 border">{data[0].sub7m}</td>
          </tr>
        </tbody>
      </table>
      <tfoot>
        <tr>
          <td className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'} p-3`}>Total Marks : {data[0].total} / 700</td>
        </tr>
        <tr>
          <td className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'} p-3`}>Percentage : {data[0].percent} %</td>
        </tr>
        <tr>
          <td className={` ${th=='dark'? 'bg-black text-white':'bg-white text-black'}`}>Result : <strong className={data[0].result=='Pass'? 'text-blue-600':'text-red-600'}>{data[0].result}</strong></td> 
          <td>  <button onClick={()=>handleDownload(data[0].result_file,data[0].username)} className='text-red-500 font-bold hover:underline hover:text-red-600'> <a href={data[0].result_file}>Download Result</a></button></td>
        </tr>
      </tfoot>  
    </>
  ) : !data ? (
    <></>
  ) : (
    <div className="text-red-600 mt-4">No result found</div>
  )}
</div>

    
  )
}

export default Result;