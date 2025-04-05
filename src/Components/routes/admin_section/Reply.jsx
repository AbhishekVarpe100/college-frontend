import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { io } from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import { FaBan } from "react-icons/fa";

const socket = io.connect('http://localhost:5000');
function Reply() {
    const [msgs, setMsgs] = useState([]);
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const { username } = useParams();

    const getData = async () => {
        const res = await axios.get('http://localhost:3000/getMsg', { params: { username } });
        setMsgs(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('adminreply', { message, username });
            setMessage(''); // Clear the input field after sending
        }
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    const handleDelete = async (id) => {
        socket.emit('delete_msg',{id});
    };

    useEffect(() => {
        socket.on('chat', (payload) => {
            getData();
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off('chat');
        };
    }, []);

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='bg-gray-100 bg-gradient-to-r from-blue-200 via-indigo-100'>
            <div className="flex flex-col h-screen  bg-gray-100 bg-gradient-to-r from-blue-200 via-indigo-100">
                <div className="flex-none bg-green-500 p-4 text-white font-bold text-lg ">
                    Reply to {username}
                </div>
                <div className="flex-1 p-4 overflow-auto space-y-4">
                    {msgs.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.msg ? 'justify-start' : 'justify-end'} group`} // Added group here
                        >
                            {/* Delete button on the left, only visible on hover */}


                        {msg.deleted==true?<>{msg.by=='admin'? <span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
                                            <FaBan className="text-gray-600 text-lg" />
                                            <span>You deleted this message</span>
                                            </span>:<span className="p-3 rounded-lg max-w-xs bg-gray-300 text-gray-600 italic shadow-md flex items-center space-x-2">
                                            <FaBan className="text-gray-600 text-lg" />
                                            <span>This message was deleted</span>
                                            </span>}</>
                                :<>{msg.by === 'admin' && (
                                <button
                                    title='Delete message'
                                    onClick={() => handleDelete(msg._id)} // Call handleDelete with msg ID
                                    className="text-red-600 text-2xl transition hidden group-hover:block mr-2" // Updated hover logic
                                >
                                    <MdDelete />
                                </button>
                            )}
                            <div
                                className={`p-3 rounded-lg max-w-xs shadow-xl ${
                                    msg.msg
                                        ? 'bg-gray-200 text-gray-800'
                                        : 'bg-green-500 text-white'
                                }`}
                            >
                                <b><i>{msg.msg ? msg.msg : msg.reply}</i></b>
                            </div>

                            {msg.time}
                            
                            </>}

                            
                        </div>
                    ))}
                </div>
                <div className="relative bg-white p-4 border-t border-gray-300 flex">
                    <button
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="bg-gray-200 text-gray-600 p-2 rounded-lg focus:outline-none mr-2"
                    >
                        😀
                    </button>
                    {showEmojiPicker && (
                        <div className="absolute bottom-16 left-0">
                            <EmojiPicker onEmojiClick={handleEmojiClick} theme="light" />
                        </div>
                    )}
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Enter a message"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reply;
