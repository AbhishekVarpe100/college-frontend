import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
function Examinations() {

  const username=useSelector((state)=>state.username);
  const email=useSelector((state)=>state.email);
  const [adData,setData]=useState([]);
  const [subData,setSubData]=useState([]);
  const [examData,setExamData]=useState([]);
  const [data, setData_] = useState([]);
  const [hallTicket,setHallTicket]=useState('');
  const [change,setChange]=useState(false);
  const [th,getTh]=useState(localStorage.getItem('theme'));
  const [formData,setFormData]=useState({
    username:username,
    email:email,
    name:'',
    course:'',
    prn:'',
    sub1:'',
    sub2:'',
    sub3:'',
    sub4:'',
    sub5:'',
    sub6:'',
    sub7:''
  })


  // const getPdf=async()=>{
  //   await axios.get('http://localhost:3000/download_hallticket',{params:{username,email}});
  // }
  const getPdf = async () => {
    try {
      const response = await axios({
        url: 'https://college-backend-4-cgya.onrender.com/download_hallticket',
        method: 'GET',
        responseType: 'blob', // Important
        params:{username,email}
      });
  
      // Create a link element, set its href to the blob URL, and trigger a download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${username}_hall_ticket.pdf`); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  
  const handleFormData=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }


  const confirmHallTicket=async()=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/confirm_hallticket',{params:{username,email}})
   
    if(res.data.pdfurl){
      setHallTicket(res.data.pdfurl)
    }

  }
  
  const getData = async () => {
    try {
      const res = await axios.get('https://college-backend-4-cgya.onrender.com/get_courses');
      setData_(res.data);
      setChange(!change)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const get_ad_data=async()=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_admission_data',{params:{username,email}});
    setData(res.data.admission_data);
    setChange(!change)
  }

  const get_sub_data=async()=>{
    const res=await axios.get('https://college-backend-4-cgya.onrender.com/get_sub_data');
    setSubData(res.data);
    setChange(!change)
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
   const res = await axios.post('https://college-backend-4-cgya.onrender.com/apply_exam',formData);
   setChange(!change)
   alert("Successfully applied for examination");
  }

  const getExamData=async()=>{
    const res=await axios.get(`https://college-backend-4-cgya.onrender.com/get_exam_data/${username}/${email}`);
    setExamData(res.data)
  }

  const handleDelete=async(id)=>{
   const res = await axios.delete('https://college-backend-4-cgya.onrender.com/delete_exam_application/'+id);
   alert("Exam form successfully deleted");
   setChange(!change);
  }

  useEffect(()=>{
    get_ad_data();
    get_sub_data();
    getData();
    getExamData();
    confirmHallTicket();
  },[])

  return (  
    <div>

    <div>

      {
        adData.length>0 ? (!adData[0].status?<div className='bg-red-100 m-6 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert'><strong>Your application is pending for admission. After approval you can apply for the exam.</strong></div>:(adData[0].status=='not_approve'?<div className='bg-red-100 border m-6 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert'><strong>You can't apply for the exam as your application is not processed for some reason.</strong></div>:
        
        <div>


<div className='m-4'>Apply for Examination</div>


{
  examData.length>0? <> 
  <div className="p-6">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">
    You have successfully applied for the examination
  </h2>

  <div className="space-y-4">
    {examData.map((ele) => (
      <div
        key={ele._id}
        className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
      >
        <div className="text-lg font-semibold text-gray-900 mb-2">
          {ele.name}
        </div>
        <div className="text-gray-600">
          <b>Course:</b> {ele.course}
        </div>

        <div><b>PRN NO.: {ele.prn}</b></div>

        <div className="grid grid-cols-2 gap-2 mt-4 text-gray-700">
          <span className="font-medium">Subject 1 :</span> <span>{ele.sub1}</span>
          <span className="font-medium">Subject 2 :</span> <span>{ele.sub2}</span>
          <span className="font-medium">Subject 3 :</span> <span>{ele.sub3}</span>
          <span className="font-medium">Subject 4 :</span> <span>{ele.sub4}</span>
          <span className="font-medium">Subject 5 :</span> <span>{ele.sub5}</span>
          <span className="font-medium">Subject 6 :</span> <span>{ele.sub6}</span>
          <span className="font-medium">Subject 7 :</span> <span>{ele.sub7}</span>
        </div>
        {hallTicket?null:<><button
          onClick={() => handleDelete(ele._id)}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
        >

           <strong>Delete Exam Form</strong> 
        </button></>}

      {hallTicket ? <a className='text-blue-600 font-bold hover:underline' href={hallTicket}>Download Hallticket</a> :<div className='m-2'>Hallticket not released yet</div>}
        
      </div>
    ))}
  </div>
</div>

</> : 




  <form onSubmit={handleSubmit} className="space-y-6 p-6 m-6 bg-gray-200 shadow-md rounded-lg">

<input onChange={handleFormData} type="text" name="name" className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter full name'/>
<div className='flex flex-col'>
<b>Select your course</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='course' onChange={handleFormData}>
      <option value="">--- Select course ---</option>
      {data.length > 0 ? (
        data.map((course) => (
          <option key={course._id} value={course.course_name}>
            {course.course_name}
          </option>
        ))
      ) : (
        <option disabled>No courses available</option>
      )}
    </select>
    
    <input type="text" className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500' name="prn" required onChange={handleFormData} placeholder='Enter yout PRN No.' />


<center className='font-bold text-red-500'>Theory subjects</center>
<b>Select subject 1 (Theory)</b>
<select required name='sub1' onChange={handleFormData} className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
<option value="">--- Select subject 1 (Theory) ---</option>

{subData.length>0 ? <>
  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}
    
</>:<option disabled>No data found</option>}
</select>

<b>Select subject 2 (Theory)</b>
<select required name='sub2' onChange={handleFormData} className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
<option value="">--- Select subject 2 (Theory) ---</option>
{subData.length>0 ? <>
  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}
  
</>:<option disabled>No data found</option>}  
</select>





<b>Select subject 3 (Theory)</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='sub3' onChange={handleFormData}>
<option value="">--- Select subject 3 (Theory) ---</option>
{subData.length>0 ? <>

  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}
  
</>:<option disabled>No data found</option>}
</select>



<b>Select subject 4 (Theory)</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='sub4' onChange={handleFormData}> 
  <option value="">--- Select subject 4 (Theory) ---</option>
{subData.length>0 ? <>

  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}
  
</>:<option disabled>No data found</option>}
</select>



<b>Select subject 5 (Theory)</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='sub5' onChange={handleFormData}>
  <option value="">--- Select subject 5 (Theory) ---</option>
{subData.length>0 ? <>

  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}
  
</>:<option disabled>No data found</option>}

</select>
<center className='font-bold text-red-500'>Practicals</center>

<b>Select subject 6 (Practical 1)</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='sub6' onChange={handleFormData}>
  <option value="">--- Select subject 6 (Practical 1) ---</option>
{subData.length>0 ? <>

  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}

</>:<option disabled>No data found</option>}
</select>

<b>Select subject 7 (Practical 2)</b>
<select className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required name='sub7' onChange={handleFormData}>
  <option value="">--- Select subject 7 (Practical 2) ---</option>
{subData.length>0 ? <>

  {subData.map((sub)=>(
    <option key={sub._id} value={sub.sub_name}> {sub.sub_name}</option>
  ))}

</>:<option disabled>No data found</option>}
</select>


<div className="flex justify-center">
    <input
      type="submit"
      value="Submit"
      className="bg-indigo-500 m-6 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-indigo-600 transition duration-200"
    />
  </div>

</div>

</form>

}

















        </div>
        
      )) :<div className='bg-red-100 m-6 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert'>  <strong>No data found of your admission apply for admission first.</strong></div> 
      }

  


    </div>
    </div>
  )
}

export default Examinations;