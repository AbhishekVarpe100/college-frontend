import React, { useEffect, useState } from 'react';
import {
  Pie,
  Bar,
  Scatter,
  Line,
  Radar,
  Doughnut,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import axios from 'axios';

// Register the necessary chart elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Statistics = () => {
  const [admissionData, setAdmissionData] = useState([]);
  const [courseLabels, setCourseLabels] = useState([]);
  const [courseCounts, setCourseCounts] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/admission_data');
      const data = res.data;
      setAdmissionData(data);

      // Process the data to get course labels and counts
      const courseMap = {};
      data.forEach((admission) => {
        const course = admission.course;
        if (courseMap[course]) {
          courseMap[course] += 1;
        } else {
          courseMap[course] = 1;
        }
      });

      const labels = Object.keys(courseMap);
      const counts = Object.values(courseMap);

      setCourseLabels(labels);
      setCourseCounts(counts);
    } catch (error) {
      console.error('Error fetching admission data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Data for the pie chart
  const pieData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Number of Admissions',
        data: courseCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(0, 204, 102, 0.5)',
          'rgba(102, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 204, 102, 1)',
          'rgba(102, 102, 255, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(0, 204, 102, 0.7)',
          'rgba(102, 102, 255, 0.7)',
        ],
      },
    ],
  };

  // Data for the bar chart
  const barData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Number of Admissions',
        data: courseCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for the scatter plot
  const scatterData = {
    datasets: courseLabels.map((course, index) => ({
      label: course,
      data: Array(courseCounts[index])
        .fill()
        .map(() => ({
          x: Math.floor(Math.random() * 100),
          y: Math.floor(Math.random() * courseCounts[index] * 10),
        })),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      borderColor: 'rgba(0, 0, 0, 1)',
    })),
  };

  // Data for the line chart
  const lineData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Number of Admissions Over Time',
        data: courseCounts,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1, // Smoothness of the curve
      },
    ],
  };

  // Data for the radar chart
  const radarData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Admissions Distribution',
        data: courseCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  // Data for the doughnut chart
  const doughnutData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Number of Admissions',
        data: courseCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(0, 204, 102, 0.5)',
          'rgba(102, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 204, 102, 1)',
          'rgba(102, 102, 255, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div>
      <h2>Admission Statistics</h2>
      <h3>Total number of admissions: {admissionData.length}</h3>
      {courseLabels.map((course, index) => (
        <p key={index}>
          {course}: {courseCounts[index]} admissions
        </p>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {/* Pie Chart */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Bar Chart */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Scatter Plot */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Scatter data={scatterData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Line Chart */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Radar Chart */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Radar data={radarData} options={{ maintainAspectRatio: false }} />
        </div>

        {/* Doughnut Chart */}
        <div style={{ width: '400px', height: '400px', margin: '20px' }}>
          <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
