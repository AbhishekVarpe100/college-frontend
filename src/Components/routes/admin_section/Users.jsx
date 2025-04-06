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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-800 mb-6">
        🌍 User Location & Device Details
      </h1>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {data.map((user, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 transition hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={user.country_flag} alt="flag" className="w-6 h-4 border rounded" />
              <h2 className="text-lg font-semibold text-blue-700">
                {user.city}, {user.country}
              </h2>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">IP:</span> {user.ip}</p>
              <p><span className="font-medium">Continent:</span> {user.continent} ({user.continent_code})</p>
              <p><span className="font-medium">Country :</span> {user.country}</p>
              <p><span className="font-medium">Country Code:</span> {user.country_code}</p>
              <p><span className="font-medium">Country Flag:</span> <a className='text-blue-600 font-bold' href={user.country_flag}>Country Flag</a></p>
              <p><span className="font-medium">Capital:</span> {user.country_capital}</p>
              <p><span className="font-medium">Phone Code:</span> {user.country_phone}</p>
              <p><span className="font-medium">Neighbours:</span> {user.country_neighbours}</p>
              <p><span className="font-medium">Region:</span> {user.region}</p>
              <p><span className="font-medium">Latitude:</span> {user.latitude}</p>
              <p><span className="font-medium">Longitude:</span> {user.longitude}</p>
              <p><span className="font-medium">ASN:</span> {user.asn}</p>
              <p><span className="font-medium">Organization:</span> {user.org}</p>
              <p><span className="font-medium">ISP:</span> {user.isp}</p>
              <p><span className="font-medium">Timezone:</span> {user.timezone}</p>
              <p><span className="font-medium">Timezone Name:</span> {user.timezone_name}</p>
              <p><span className="font-medium">DST Offset:</span> {user.timezone_dstOffset}</p>
              <p><span className="font-medium">GMT:</span> {user.timezone_gmt}</p>
              <p><span className="font-medium">GMT Offset:</span> {user.timezone_gmtOffset}</p>
              <p><span className="font-medium">Currency:</span> {user.currency}</p>
              <p><span className="font-medium">Currency Code:</span> {user.currency_code}</p>
              <p><span className="font-medium">Currency Symbol:</span> {user.currency_symbol}</p>
              <p><span className="font-medium">Currency Plural:</span> {user.currency_plural}</p>
              <p><span className="font-medium">Currency Rate:</span> {user.currency_rates}</p>
              <p><span className="font-medium">Browser:</span> {user.browser}</p>
              <p><span className="font-medium">OS:</span> {user.os}</p>
              <p><span className="font-medium">Device:</span> {user.device}</p>
              <p><span className="font-medium">Timestamp:</span> {new Date(user.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
