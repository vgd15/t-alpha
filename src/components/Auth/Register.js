import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name,
      taxNumber,
      mail: email,
      phone,
      password,
    };

    console.log('Submitting user data:', userData);

    try {
      const response = await axios.post(
        'https://interview.t-alpha.com.br/api/auth/register',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Server response:', response);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-register d-flex justify-content-center align-items-center">
      <div class="container">
      <div class="d-flex justify-content-center align-items-center">
      <  div class="formulario col-6"> 
        <form class="d-flex flex-column" onSubmit={handleSubmit}>
      <h2 class="text-center ">Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />
      <input
        type="text"
        value={taxNumber}
        onChange={(e) => setTaxNumber(e.target.value)}
        placeholder="Tax Number"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Register</button>

      <a href="/">Voltar ao login</a>
    </form>
        </div>
      
      </div>
      
      </div>
      
    </div>
    
  );
};

export default Register;
