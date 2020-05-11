import React, { useState, useEffect } from 'react';
import axios from 'axios';

import MainNavBar from '../../Navigation/MainNavBar';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSearch = () => {
    if (query) {
      if (filter) {
        // code for searching with Search and Filter function ( look up prod by name and category)
        console.log(filter);
        axios.get(`/api/products/${query}/${filter}`).then((res) => {
          setProducts(res.data);
        });
      } else {
        // code for searching with Search function (Can search for anythig by name)
        console.log('this is what i need');
        console.log(query);
        axios.get(`/api/products/${query}`).then((res) => {
          setProducts(res.data);
        });
      }
    } else if (filter) {
      // code for searching with  Filter function ( Eletronics, Apperel, etc)
      console.log(filter);
      axios.get(`/api/products/all/${filter}`).then((res) => {
        setProducts(res.data);
      });
    } else {
      // code which will result in displaying all product
      console.log('getting all');
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
      <div>
        <MainNavBar />
        {/* <h1>filter => {filter}</h1>
        <h2>
          Search for a specific item or Search with empty input to get all
          products
        </h2> */}

        <select
        // code for filter drop down menu
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
