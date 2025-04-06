import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get('https://college-backend-4-cgya.onrender.com/get-user-details');
      if (res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-4">
        🌍 User Location & Device Details
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Total Users: <span className="font-semibold">{data.length}</span>
      </p>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {data.map((user, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <img src={user.country_flag} alt="flag" className="w-6 h-4 rounded mr-3 border" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.city}, {user.region}</h2>
                <p className="text-sm text-gray-500">{user.country}</p>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>IP:</strong> {user.ip}</p>
              <p><strong>Continent:</strong> {user.continent} ({user.continent_code})</p>
              <p><strong>Country:</strong> {user.country}</p>
              <p><strong>Country Code:</strong> {user.country_code}</p>
              <p><strong>Capital:</strong> {user.country_capital}</p>
              <p><strong>Phone Code:</strong> {user.country_phone}</p>
              <p><strong>Neighbours:</strong> {user.country_neighbours}</p>
              <p><strong>Latitude:</strong> {user.latitude}</p>
              <p><strong>Longitude:</strong> {user.longitude}</p>
              <p><strong>ASN:</strong> {user.asn}</p>
              <p><strong>Organization:</strong> {user.org}</p>
              <p><strong>ISP:</strong> {user.isp}</p>
              <p><strong>Timezone:</strong> {user.timezone} ({user.timezone_name})</p>
              <p><strong>DST Offset:</strong> {user.timezone_dstOffset}</p>
              <p><strong>GMT:</strong> {user.timezone_gmt} ({user.timezone_gmtOffset})</p>
              <p><strong>Currency:</strong> {user.currency} ({user.currency_symbol}, {user.currency_code})</p>
              <p><strong>Currency Rate:</strong> {user.currency_rates}</p>
              <p><strong>Currency Plural:</strong> {user.currency_plural}</p>
              <p><strong>Browser:</strong> {user.browser}</p>
              <p><strong>OS:</strong> {user.os}</p>
              <p><strong>Device:</strong> {user.device}</p>
              <p><strong>Timestamp:</strong> {new Date(user.timestamp).toLocaleString()}</p>
              <p><strong>Country Flag:</strong> <a href={user.country_flag} className="text-indigo-600 font-medium" target="_blank" rel="noopener noreferrer">View</a></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
