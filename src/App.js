import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductForm from './components/Products/ProductForm.js';
import ProductList from './components/Products/ProductList.js';
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js';
import './App.css';

function App() {
  return (
    <div class="app">
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/products" element={<ProductList />} />
           <Route path="/products/create-product" element={<ProductForm />} />
           <Route path="/products/update-product/:id" element={<ProductForm />} /> 
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
