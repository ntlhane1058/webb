// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch products and users data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await fetch('http://localhost:5000/api/products');
        const productData = await productResponse.json();
        setProducts(productData);

        const userResponse = await fetch('http://localhost:5000/api/users');
        const userData = await userResponse.json();
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart data for products
  const productChartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Quantity Sold',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Overview',
      },
    },
  };

  // Pie chart data for users
  const userChartData = {
    labels: ['Breakfast', 'Lunch', 'Dinner'],
    datasets: [
      {
        label: 'User Gender Distribution',
        data: [
          users.filter((user) => user.gender === 'Breakfast').length,
          users.filter((user) => user.gender === 'Lunch').length,
          users.filter((user) => user.gender === 'Dinner').length,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 205, 86, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Navigation Links */}
      <div style={{ margin: '20px 0' }}>
        <Link to="/product-management" style={linkStyle}>
          Product Management
        </Link>
        <Link to="/user-management" style={linkStyle}>
          User Management
        </Link>
      </div>

      {/* Product Stock Overview Bar Chart */}
      <div style={{ width: '80%', margin: '0 auto', height: '400px' }}>
        <h2>Product Stock Overview</h2>
        <Bar data={productChartData} options={chartOptions} />
      </div>

      {/* User Gender Distribution Pie Chart */}
      <div style={{ width: '80%', margin: '0 auto', height: '400px' }}>
        <h2>Food Distribution</h2>
        <Pie data={userChartData} />
      </div>
    </div>
  );
};

// Styling for the links
const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
  fontSize: '18px',
  margin: '10px',
  padding: '10px',
  borderRadius: '5px',
  backgroundColor: '#f8f9fa',
  transition: 'background-color 0.3s, color 0.3s',
};

export default Dashboard;
