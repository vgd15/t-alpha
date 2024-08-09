import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import Header from '../header/header.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./products.css";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para produtos filtrados
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://interview.t-alpha.com.br/api/products/get-all-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.data && Array.isArray(response.data.data.products)) {
          setProducts(response.data.data.products);
          setFilteredProducts(response.data.data.products); // Inicialmente exibe todos os produtos
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleSearch = (term) => {
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Header onSearch={handleSearch} /> {/* Passa a função de busca */}
      <div className="title">
        <h1 className="text-center m-5 fw-bold">Todos os produtos</h1>
      </div>
      <div className="container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1, // Para telas muito pequenas (opcional)
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2, // Para telas até 991px
              spaceBetween: 10,
            },
            991: {
              slidesPerView: 3, // Para telas acima de 991px
              spaceBetween: 10,
            },
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))
          ) : (
            <p>No products found</p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
