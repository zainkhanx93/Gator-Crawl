import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    if (query) {
      if (filter) {
        axios.get(`/api/products/${query}/${filter}`).then((res) => {
          setProducts(res.data);
        });
      } else {
        axios.get(`/api/products/${query}`).then((res) => {
          setProducts(res.data);
        });
      }
    } else if (filter) {
      axios.get(`/api/products/all/${filter}`).then((res) => {
        setProducts(res.data);
      });
    } else {
      axios.get('/api/products/all').then((res) => {
        setProducts(res.data);
      });
    }
  };

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      <div className="profile">
        <h1>filter => {filter}</h1>
        <h2>
          Search for a specific item or Search with empty input to get all
          products
        </h2>

        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
          <option defaultValue value="" />
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="search" onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      <div>
        {products.map((product) => (
          <div key={product.id} className="profile">
            <img src={product.photo} alt={product.productName} />
            <strong>Product Name: </strong> {product.productName}
            <br />
            <strong>Description: </strong> {product.description}
            <br />
            <strong>Price: </strong>${product.price}
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
