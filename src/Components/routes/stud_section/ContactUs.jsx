import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ContactUs() {
  const username = useSelector((state) => state.username);
  const email = useSelector((state) => state.email);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    username: username,
    user_email: email,
  });

  const [queries, setQueries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/users_query', data);
    if (res) {
      alert(res.data);
    }
  };

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/get_queries", { params: { username, email } });
    setQueries(res.data);
  };

  useEffect(() => {
    getData();
  });

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:3000/delete_query/${id}`);
    alert(res.data);
  };

  return (
    <>
      <div className="flex flex-col items-center p-6">
        <div className="text-center mb-6">
          <p>Email address: <b>academia_hub_university@gmail.com</b></p>
          <p>Contact no.: <b>+91 7840974011</b></p>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">For any query fill the form</h2>
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Enter your name</label>
              <input required
                name="name"
                onChange={handleChange}
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Enter your email</label>
              <input required
                name="email"
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="xyz@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Enter your phone number</label>
              <input required
                name="phone"
                onChange={handleChange}
                id="phone"
                type="text"
                placeholder="Enter phone number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-gray-700 text-sm font-bold mb-2">Enter your course name</label>
              <input required
                name="course"
                onChange={handleChange}
                id="course"
                type="text"
                placeholder="Enter your course name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="msg" className="block text-gray-700 text-sm font-bold mb-2">Enter your message / query</label>
              <textarea required
                name="message"
                onChange={handleChange}
                id="msg"
                placeholder="Enter your message / query here"
                rows="6"
                cols="24"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                value="Submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              />
            </div>
          </form>
        </div>
      </div>

      {queries.length > 0 ? (
        <div className="p-4">
          <div className="text-lg  font-bold mb-4">Your queries</div>
          {queries.map((ele) => (
            <div key={ele._id} className="hover:shadow flex flex-col bg-white p-6 mb-4 rounded-lg shadow-lg transition duration-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-bold">{ele.message}</span>
                <button
                  onClick={() => handleDelete(ele._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  <b>Delete</b>
                </button>
              </div>
              <div className="text-gray-600">
                {ele.admin_reply ? <> <b className='text-green-500'>Admin reply : </b> {ele.admin_reply}</> : <><b className='text-red-500'>Status : </b> Not seen yet</>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">You haven't posted any query yet</div>
      )}
    </>
  );
}

export default ContactUs;
