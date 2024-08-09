import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const product = response.data.data;
          console.log('Fetched product:', product);
          setName(product.name || '');
          setDescription(product.description || '');
          setPrice(product.price !== undefined ? product.price : '');
          setStock(product.stock !== undefined ? product.stock : '');
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, description, price: parseFloat(price), stock: parseInt(stock) };
    console.log('Submitting product:', product);

    try {
      let response;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (id) {
        response = await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${id}`, product, config);
      } else {
        response = await axios.post('https://interview.t-alpha.com.br/api/products/create-product', product, config);
      }
      console.log('Server response:', response);
      navigate('/products');
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
    }
  };

  return (

    <div className="page d-flex justify-content-center align-items-center">
       <div class="container">
       <div class="d-flex justify-content-center align-items-center">
       < div class="formulario col-6">
       <form class="d-flex flex-column" onSubmit={handleSubmit}>
      <h2 class="text-center">{id ? 'Edit Product' : 'Create Product'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product description"
        required
      />
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product Price"
        required
      />
      <input
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Product stock"
        required
      />
      <button type="submit">{id ? 'Update' : 'Create'}</button>

      <a class="pb-2" href='/products'>Voltar para página inicial</a>
    </form>
        </div>
       
       </div>
       </div>
      
    </div>
    
  );
};

export default ProductForm;
