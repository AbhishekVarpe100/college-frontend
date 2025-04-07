import React from 'react';
import { FaUniversity, FaChalkboardTeacher, FaLightbulb, FaStar, FaUsers, FaHandshake } from 'react-icons/fa';

function About() {
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-800 border-b-2 border-gray-300 pb-4 inline-block">
            <FaUniversity className="inline-block mr-2 mb-1 text-red-700" />
            About AcademiaHub University
          </h1>
        </header>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to AcademiaHub University, a leading institution dedicated to excellence in education, research, and innovation. Established with the vision of creating a nurturing environment for intellectual growth and personal development, AcademiaHub University stands at the forefront of academic excellence and cutting-edge research.
          </p>
          
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <FaChalkboardTeacher className="text-red-700 text-2xl mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-gray-800">Our Mission</h2>
            </div>
            <div className="pl-9">
              <p className="text-gray-700 leading-relaxed">
                At AcademiaHub University, our mission is to empower students to achieve their fullest potential by providing a comprehensive and dynamic learning experience. We strive to cultivate critical thinking, creativity, and leadership skills in our students, preparing them to make meaningful contributions to society.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <FaLightbulb className="text-red-700 text-2xl mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-gray-800">Our Vision</h2>
            </div>
            <div className="pl-9">
              <p className="text-gray-700 leading-relaxed">
                Our vision is to be a global leader in higher education, recognized for our commitment to academic rigor, research innovation, and community engagement. We aim to foster a diverse and inclusive environment where students, faculty, and staff can thrive and excel.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-3">
              <FaStar className="text-red-700 text-2xl mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-gray-800">Key Highlights</h2>
            </div>
            <div className="pl-9">
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-700 mt-2 mr-2"></span>
                  <span className="flex-1"><strong>Academic Excellence:</strong> Offering a wide range of undergraduate, graduate, and professional programs across various fields of study.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-700 mt-2 mr-2"></span>
                  <span className="flex-1"><strong>Research and Innovation:</strong> State-of-the-art research facilities and collaborative initiatives that foster a culture of research and innovation.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-700 mt-2 mr-2"></span>
                  <span className="flex-1"><strong>Student Life:</strong> Vibrant and enriching student life with numerous extracurricular activities, student organizations, and support services.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-700 mt-2 mr-2"></span>
                  <span className="flex-1"><strong>Community Engagement:</strong> Actively engaging with local, national, and global partners to create a positive impact.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-700 mt-2 mr-2"></span>
                  <span className="flex-1"><strong>Diversity and Inclusion:</strong> Committed to creating a welcoming and supportive environment for all members of our community.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex items-center mb-3">
              <FaHandshake className="text-red-700 text-2xl mr-3" />
              <h2 className="text-2xl font-serif font-semibold text-gray-800">Join Us</h2>
            </div>
            <div className="pl-9">
              <p className="text-gray-700 leading-relaxed">
                Whether you are a prospective student, a researcher, or a partner organization, we invite you to join us in our journey of academic excellence and innovation. Together, we can make a difference and shape the future.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-600 italic mb-8">
          "Education is not the filling of a pail, but the lighting of a fire." — W.B. Yeats
        </div>
        
        <div className="flex justify-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
            <FaUsers className="text-4xl text-red-700" />
          </div>
          <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
            <FaLightbulb className="text-4xl text-red-700" />
          </div>
          <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
            <FaUniversity className="text-4xl text-red-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
