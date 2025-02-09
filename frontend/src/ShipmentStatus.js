import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const ShipmentStatus = ({ token, setLoggedIn }) => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    document.title = "ABC Logistics - Shipments";

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
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        ABC LOGISTICS
      </Typography>
      <Typography variant="h5" gutterBottom>
        Your Shipments
      </Typography>
      <Button onClick={handleLogout} variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Logout
      </Button>
      
      {error && <Typography color="error">{error}</Typography>}
      
      {shipments.length === 0 ? (
        <Typography>No shipments found</Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {shipments.map((shipment) => {
            // Format the estimated delivery date
            const formattedDate = new Date(shipment.estimated_delivery_date).toLocaleDateString('en-GB');

            return (
              <Grid item key={shipment.id} xs={12} sm={6} md={4}>
                <Card style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", padding: "10px" }}>
                  <CardContent>
                    <Typography variant="h6">Tracking Number: {shipment.tracking_number}</Typography>
                    <Typography>Status: {shipment.status}</Typography>
                    <Typography>Estimated Delivery Date: {formattedDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};


export default ShipmentStatus;