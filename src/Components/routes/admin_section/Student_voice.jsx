import axios from 'axios';
import React, { useEffect, useState } from 'react';

function StudentVoice() {
  const [queries, setQueries] = useState([]);
  const [visibleTextareas, setVisibleTextareas] = useState({});
  const [reply,setReply]=useState('');
  const [id,setId]=useState('');

  const getData = async () => {
    const res = await axios.get("https://college-backend-4-cgya.onrender.com/get_queries_all");
    setQueries(res.data);
  };

  const handleClick = (id) => {
    setId(id);
    setVisibleTextareas((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const res=await axios.post('https://college-backend-4-cgya.onrender.com/reply',{id,reply});
    alert(res.data);
  }

  useEffect(() => {
    getData();
  });

  return (
    <div className="container mx-auto p-4">
      {queries.length > 0 ? (
        <div>
          <div className="text-lg font-bold mb-4">Queries</div>
          {queries.map((ele) => (
            <div 
              key={ele._id} 
              className="flex hover:shadow flex-col bg-white p-6 mb-4 rounded-lg shadow-lg transition duration-500"
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="w-full sm:w-1/2 md:w-1/3 mb-2">
                  <span className="font-semibold">Student Name:</span>
                  <span className="ml-2">{ele.name}</span>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-2">
                  <span className="font-semibold">Phone No.:</span>
                  <span className="ml-2">{ele.phone}</span>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-2">
                  <span className="font-semibold">Course Name:</span>
                  <span className="ml-2">{ele.course}</span>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3 mb-2">
                  <span className="font-semibold">Query:</span>
                  <span className="ml-2 text-gray-800">{ele.message}</span>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/3">
                  <span className="font-semibold">Created On:</span>
                  <span className="ml-2">{ele.timestamp}</span>
                </div>
              </div>
              <div className="w-full mt-2">
                

                {
                  ele.admin_reply? <>Replied</>:<> <form onSubmit={handleSubmit} 
                  className="flex flex-col md:flex-row items-center" 
                  style={{ display: visibleTextareas[ele._id] ? 'block' : 'none' }}
                >
                  <textarea placeholder='Reply to candidate' onChange={(e)=>setReply(e.target.value)}
                    className="w-full  p-2 mb-2 md:mb-0 md:mr-2 border border-blue-500 rounded" 
                    type="text" 
                  />
                  <input
                    type="submit" 
                    value="Send" 
                    className="bg-blue-500 font-bold my-4 text-white px-4 py-2  rounded cursor-pointer hover:bg-blue-600"
                  />
                </form>  <button 
                  onClick={() => handleClick(ele._id)} 
                  className="bg-green-600 text-white px-4 py-2 rounded mt-2 md:mt-0 cursor-pointer hover:bg-green-500"
                >
                  <b> Reply</b> 
                </button>

                </>
                 }
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">No queries</div>
      )}
    </div>
  );
}

export default StudentVoice;
