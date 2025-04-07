import React, { useState } from 'react';
import '../../css/About.css';

function About() {

  return (
    <div className={`text-2xl about-containe flex items-center justify-center`} >  
      <div className={``}>
        <h1 className={` text-4xl font-bold mb-6 `} >About AcademiaHub University</h1>
        <p className="mb-6 text-gray-700">Welcome to AcademiaHub University, a leading institution dedicated to excellence in education, research, and innovation. Established with the vision of creating a nurturing environment for intellectual growth and personal development, AcademiaHub University stands at the forefront of academic excellence and cutting-edge research.</p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700">At AcademiaHub University, our mission is to empower students to achieve their fullest potential by providing a comprehensive and dynamic learning experience. We strive to cultivate critical thinking, creativity, and leadership skills in our students, preparing them to make meaningful contributions to society.</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Vision</h2>
          <p className="text-gray-700">Our vision is to be a global leader in higher education, recognized for our commitment to academic rigor, research innovation, and community engagement. We aim to foster a diverse and inclusive environment where students, faculty, and staff can thrive and excel.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Highlights</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Academic Excellence: Offering a wide range of undergraduate, graduate, and professional programs across various fields of study.</li>
            <li>Research and Innovation: State-of-the-art research facilities and collaborative initiatives that foster a culture of research and innovation.</li>
            <li>Student Life: Vibrant and enriching student life with numerous extracurricular activities, student organizations, and support services.</li>
            <li>Community Engagement: Actively engaging with local, national, and global partners to create a positive impact.</li>
            <li>Diversity and Inclusion: Committed to creating a welcoming and supportive environment for all members of our community.</li>
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Join Us</h2>
          <p className="text-gray-700">Whether you are a prospective student, a researcher, or a partner organization, we invite you to join us in our journey of academic excellence and innovation. Together, we can make a difference and shape the future.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
