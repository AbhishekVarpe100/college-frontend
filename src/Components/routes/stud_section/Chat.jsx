// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { MdDelete } from "react-icons/md";
// import { io } from 'socket.io-client';
// import axios from 'axios';
// import EmojiPicker from 'emoji-picker-react';
// import { FaBan } from "react-icons/fa";
// const socket = io.connect('http://localhost:5000');

// function Chat() {
//     const [msg, setMsg] = useState('');
//     const [msgs, setMsgs] = useState([]);
//     const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//     const username = useSelector((state) => state.username);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (msg.trim()) {
//             socket.emit('chat', { msg, username });
//             setMsg(''); // Clear the input field after sending
//         }
//     };

//     const getMsg = async () => {
//         const res = await axios.get('http://localhost:3000/getMsg', { params: { username } });
//         setMsgs(res.data);
//     };

//     useEffect(() => {
//         socket.on('chat', () => {
//             getMsg();
//         });

//         // Cleanup the event listener on component unmount
//         return () => {
//             socket.off('chat');
//         };
//     }, []);

//     useEffect(() => {
//         getMsg();
//     }, []);

//     const handleEmojiClick = (emoji) => {
//         setMsg((prevMsg) => prevMsg + emoji.emoji);
//         setShowEmojiPicker(false);
//     };

//     const handleDelete = async (id) => {
//         socket.emit('delete_msg',{id});
//     };

//     return (
//         <div className='bg-gray-100 bg-gradient-to-r from-blue-200 via-indigo-100'>
//             <div className="flex flex-col h-screen ">
//                 <div className="flex-1 p-4 overflow-auto">
//                     {msgs.length > 0 ? (
//                         msgs.map((msg, index) => (
//                             <div
//                                 key={index}
//                                 className={`relative my-4 flex items-center ${msg.reply ? 'justify-start' : 'justify-end'} group`}
//                             >
//                                 {/* Delete button, visible on hover, positioned on the left side */}


//                                 {msg.deleted==true? <>{msg.by=='user'? <span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
//                                             <FaBan className="text-gray-600 text-lg" />
//                                             <span>You deleted this message</span>
//                                             </span> : <span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
//                                             <FaBan className="text-gray-600 text-lg" />
//                                             <span>This message was deleted</span>
//                                             </span>}</>: <>
//                                     {
//                                     msg.by=='user'? <><button title='delete message'
//                                     onClick={() => handleDelete(msg._id)} // Call handleDelete with msg ID
//                                     className="text-red-600 text-2xl transition  hover:text-red-700 hidden group-hover:block ml-2"
//                                 >
//                                     <MdDelete></MdDelete>
//                                 </button></>:<></>
//                                 }

//                                 <div
//                                     className={`p-3 m-2 rounded-lg max-w-xs shadow-xl ${
//                                         msg.reply ? 'bg-gray-200 text-gray-800' : 'bg-green-500 text-white'
//                                     }`}
//                                 >
//                                     <b><i>{msg.msg ? msg.msg : msg.reply}</i></b>
//                                 </div></>}
                                
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center text-gray-600">No messages available</div>
//                     )}
//                 </div>
                
//                 <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-300 flex relative">
//                     <button
//                         type="button"
//                         onClick={() => setShowEmojiPicker((prev) => !prev)}
//                         className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg mr-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                     >
//                         😀
//                     </button>
//                     {showEmojiPicker && (
//                         <div className="absolute bottom-16 left-0 z-10">
//                             <EmojiPicker onEmojiClick={handleEmojiClick} />
//                         </div>
//                     )}
//                     <input
//                         value={msg}
//                         onChange={(e) => setMsg(e.target.value)}
//                         placeholder="Enter a message"
//                         type="text"
//                         className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         Send
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Chat;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { io } from 'socket.io-client';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';
import { FaBan } from "react-icons/fa";

import image from './image.jpg'
import image2 from './image2.jpg'
const socket = io.connect('http://localhost:5000');

function Chat() {
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const username = useSelector((state) => state.username);
    const [theme,setTheme]=useState(localStorage.getItem('theme'))

    const handleSubmit = (e) => {
        e.preventDefault();
        if (msg.trim()) {
            socket.emit('chat', { msg, username });
            setMsg(''); // Clear the input field after sending
        }
    };

    const getMsg = async () => {
        const res = await axios.get('http://localhost:3000/getMsg', { params: { username } });
        setMsgs(res.data);
    };

    useEffect(() => {
        socket.on('chat', () => {
            getMsg();
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off('chat');
        };
    }, []);

    useEffect(() => {
        getMsg();
    }, []);

    const handleEmojiClick = (emoji) => {
        setMsg((prevMsg) => prevMsg + emoji.emoji);
        setShowEmojiPicker(false);
    };

    const handleDelete = async (id) => {
        socket.emit('delete_msg',{id});
    };

    return (
        // Apply background image
        <div className='bg-gray-100 h-screen'>
            <div className="flex flex-col h-screen" style={{ 
                backgroundImage: `url({ ${theme=='dark'? "https://img.freepik.com/free-photo/beautiful-nature-landscape-with-mountains-lake_23-2150705972.jpg":''})`, 
                backgroundSize: 'cover', 
                backgroundRepeat: 'repeat' }}>
                
                <div className="flex-1 p-4 overflow-auto">
                    {msgs.length > 0 ? (
                        msgs.map((msg, index) => (
                            <div
                                key={index}
                                className={`relative my-4 flex items-center ${msg.reply ? 'justify-start' : 'justify-end'} group`}
                            >
                                {msg.deleted === true ? (
                                    msg.by === 'user' ? (
                                        <span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
                                            <FaBan className="text-gray-600 text-lg" />
                                            <span>You deleted this message</span>
                                        </span>
                                    ) : (
                                        <span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
                                            <FaBan className="text-gray-600 text-lg" />
                                            <span>This message was deleted</span>
                                        </span>
                                    )
                                ) : (
                                    <>
                                        {msg.by === 'user' && (
                                            <button
                                                title="Delete message"
                                                onClick={() => handleDelete(msg._id)} // Call handleDelete with msg ID
                                                className="text-red-600 text-2xl transition  hover:text-red-700 hidden group-hover:block ml-2"
                                            >
                                                <MdDelete />
                                            </button>
                                        )}

                                        <div
                                            className={`p-3 m-2 rounded-lg max-w-xs shadow-xl ${
                                                msg.reply ? 'bg-gray-200 text-gray-800' : 'bg-green-500 text-white'
                                            }`}
                                        >
                                            <b><i>{msg.msg ? msg.msg : msg.reply} </i></b>
                                        </div>
                                        {msg.time}
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-600">No messages available</div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-4 border-t border-gray-300 flex relative">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg mr-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        😀
                    </button>
                    
                    {showEmojiPicker && (
                        <div className="absolute bottom-16 left-0 z-10">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                    
                    <input
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Enter a message"
                        type="text"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chat;
