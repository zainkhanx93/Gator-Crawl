import React from 'react';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import AdminChecker from '../Containers/HOC/AdminChecker';
import './Admin.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (token) {
      axios.get('/admin/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        // console.table(response.data);
        this.setState({ products: response.data });
      });
    }
  }

  // Approve a user post
  approve = (event) => {
    event.persist();
    const { products } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios.patch(`/admin/product/${event.target.value}`, { approved: true }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      const array = products.filter((item) => {
        return (+item.id !== +event.target.value);
      });
      this.setState({ products: array });
    });
  }

  // Deny and delete a user post
  deny = (event) => {
    event.persist();
    const { products } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios.delete(`/api/products/${event.target.value}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      const array = products.filter((item) => {
        return (+item.id !== +event.target.value);
      });
      this.setState({ products: array });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <p>Admin Panel</p>
        <hr />
        <br />
        {products.length === 0 ? <p>No pending products</p> : products.map((item) => (
          <div className="adminbox" key={item.id} value={item.id}>
            <p>Name: {item.productName}</p>
            <p>Id: {item.id}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <p>SellerId: {item.sellerId}</p>
            <p>CategoryId: {item.categoryId}</p>
            <button value={item.id} type="submit" onClick={(event) => this.approve(event)}>Approve</button>
            <button value={item.id} type="submit" onClick={(event) => this.deny(event)}>Deny</button>
          </div>
        ))}
        <br />
        <hr />
        <Link to="/home">Back to home</Link>
      </div>
    );
  }
}

export default AdminChecker(Admin);
