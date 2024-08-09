import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const navigate = useNavigate(); // Correção aqui

  const handleEdit = () => {
    navigate(`update-product/${product.id}`); // Correção aqui
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://interview.t-alpha.com.br/api/products/delete-product/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.stock}</p>
      <div class="d-flex button-item">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;
