import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
import logo from "../img/logo.png";
import hero2 from "../img/hweo2.png";

const Login = () => {
  const [taxNumber, setTaxNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login with:', { taxNumber, password });

    try {
      const response = await axios.post('https://interview.t-alpha.com.br/api/auth/login', {
        taxNumber,
        password,
      });
      console.log('Login response:', response);

      if (response.data && response.data.data && response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        console.log('Token stored:', localStorage.getItem('token'));
        navigate('/products');
      } else {
        console.error('No token received:', response.data);
        alert('Login failed, please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please check your credentials and try again.');
    }
  };

  return (
    <div class="page-login d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="d-flex justify-content-center align-items-center flex-wrap">
        <div class="formulario col-4 position-relative">
        
        <form class="d-flex flex-column" onSubmit={handleSubmit}>
        <img src={logo} alt="logo da empresa"/>
      <h2 class="text-center mb-5">Login</h2>
      <input
        type="text"
        value={taxNumber}
        onChange={(e) => setTaxNumber(e.target.value)}
        placeholder="CPF"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button class="login" type="submit">Login</button>
      <button><a href="/register">Register</a></button>

    </form>

        </div>
        <div className="box-hero col-4">
        <img src={hero2} alt="lmagem decoração"/>
        <div class="hero-decoration"></div>
        </div>

        </div>
        
      </div>
      
    </div>
    
  );
};

export default Login;
