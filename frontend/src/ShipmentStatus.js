import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShipmentStatus = ({ token, setLoggedIn }) => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/shipments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setShipments(response.data);
      } catch (error) {
        setError('Failed to fetch shipments');
      }
    };

    fetchShipments();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div>
      <h2>Your Shipments</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shipments.length === 0 ? (
        <p>No shipments found</p>
      ) : (
        <ul>
          {shipments.map((shipment) => (
            <li key={shipment.id}>
              <p>Tracking Number: {shipment.tracking_number}</p>
              <p>Status: {shipment.status}</p>
              <p>Estimated Delivery Date: {shipment.estimated_delivery_date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShipmentStatus;