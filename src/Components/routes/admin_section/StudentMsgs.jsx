import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import {Link} from 'react-router-dom';
const socket = io.connect('http://localhost:5000');

function StudentMsgs() {
    const [studs, setStuds] = useState([]);

    const getStuds = async () => {
        const res = await axios.get('http://localhost:3000/getMsgs');
        setStuds(res.data);
    };

    useEffect(() => {
        socket.on('chat', (payload) => {
            getStuds();
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off('chat');
        };
    }, []);

    useEffect(() => {
        getStuds();
    }, []);

    // Create a Set of distinct usernames
    const distinctUsernames = Array.from(new Set(studs.map(ele => ele.username)));

    return (
        <div>
            <div className="p-4 bg-gray-100 min-h-screen">
            <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Student Messages</h2>
                {distinctUsernames.length > 0 ? (
                    distinctUsernames.map((username, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b">
                               <b className="text-gray-800">Username : {username}</b>
                            <Link
                                to={`/admin/stud_msgs/reply/${username}`}
                                className="text-blue-500 hover:underline"
                            >
                                See & Reply
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No student messages available</div>
                )}
            </div>
        </div>
        </div>
    );
}

export default StudentMsgs;
