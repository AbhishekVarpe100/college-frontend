import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const texts = ["Law", "Management", "Engineering", "Computer Science", "Medical"];
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    
    let timer;

    if(localStorage.getItem('username') && localStorage.getItem('email')){
      navigate('/profile');
    }

    if (isTyping) {
      timer = setTimeout(() => {
        const newText = texts[index].slice(0, currentText.length + 1);
        setCurrentText(newText);

        if (newText === texts[index]) {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            setIndex((prevIndex) => (prevIndex + 1) % texts.length);
            setCurrentText('');
          }, 2000); // Wait 2 seconds before typing next word
        }
      }, 150); // Typing speed
    }

    return () => clearTimeout(timer);

  }, [index, currentText, isTyping]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" 
         style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1371896330/photo/happy-asian-woman-in-his-graduation-day.jpg?s=612x612&w=0&k=20&c=Ur3moWl1fKFms-6UACseglMjoYAynYKzsanZpgK8lFk=")' }}>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-2xl p-6 text-left">
        <h1 className="text-4xl sm:text-6xl font-bold text-violet-500 mb-4">
          Welcome to AcademiaHub University
        </h1>
        <article className="text-lg sm:text-2xl font-bold text-white mb-8">
          Learn emerging skills, technologies, and trends from the best university
        </article>
        <div className="text-3xl sm:text-7xl font-bold text-white">
          Get enrolled and certified in <span className="text-yellow-400">{currentText}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
