import React from 'react';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import MainNavBar from '../../Components/Navigation/MainNavBar';
import AdminChecker from '../HOC/AdminChecker';
import './Admin.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sales: [],
    };
  }

  componentDidMount() {
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (token) {
      axios
        .get('/admin/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.table(response.data);
          this.setState({ products: response.data });
        });

      axios
        .get('/admin/sales', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.setState({ sales: response.data });
        });
    }
  }

  approveSale = (event) => {
    event.persist();
    const { sales } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios
      .patch(
        `/admin/sale/${event.target.value}`,
        { approved: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const array = sales.filter((item) => {
          return +item.id !== +event.target.value;
        });
        this.setState({ sales: array });
      });
  };

  // Deny and delete a user post
  denySale = (event) => {
    event.persist();
    console.log(event.target.value);
    const { sales } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios
      .delete(`/api/sales/${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const array = sales.filter((item) => {
          return +item.id !== +event.target.value;
        });
        this.setState({ sales: array });
      });
  };

  // Approve a user post
  approveProduct = (event) => {
    event.persist();
    const { products } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios
      .patch(
        `/admin/product/${event.target.value}`,
        { approved: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        const array = products.filter((item) => {
          return +item.id !== +event.target.value;
        });
        this.setState({ products: array });
      });
  };

  // Deny and delete a user post
  denyProduct = (event) => {
    event.persist();
    const { products } = this.state;
    const cookie = new Cookies();
    const token = cookie.get('token');
    axios
      .delete(`/api/products/${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const array = products.filter((item) => {
          return +item.id !== +event.target.value;
        });
        this.setState({ products: array });
      });
  };

  render() {
    const { sales, products } = this.state;
    return (
      <div>
        <MainNavBar />
        <h1 style={{ textAlign: 'center' }}>Admin Panel</h1>
        <hr />
        <Link to="/home"><p style={{ textAlign: 'center' }}>Back to home</p></Link>
        <br />
        <div className="adminPanel">
          <div className="sales">
            <h2>Sales</h2>
            {sales.length === 0 ? (
              <p>No pending sales</p>
            ) : (
              sales.map((item) => (
                <div className="itembox" key={item.id} value={item.id}>
                  <p>Id: {item.id}</p>
                  <p>BuyerId: {item.buyerId}</p>
                  <p>SellerId: {item.sellerId}</p>
                  <p>ProductId: {item.productId}</p>
                  <p>Selling Price: {item.price}</p>
                  <button
                    value={item.id}
                    type="submit"
                    onClick={(event) => this.approveSale(event)}
                  >
                    Approve
                  </button>
                  <button
                    value={item.id}
                    type="submit"
                    onClick={(event) => this.denySale(event)}
                  >
                    Deny
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="products">
            <h2>Products</h2>
            {products.length === 0 ? (
              <p>No pending products</p>
            ) : (
              products.map((item) => (
                <div className="itembox" key={item.id} value={item.id}>
                  <p>Name: {item.productName}</p>
                  <p>Id: {item.id}</p>
                  <p>Description: {item.description}</p>
                  <p>Price: {item.price}</p>
                  <p>SellerId: {item.sellerId}</p>
                  <p>CategoryId: {item.categoryId}</p>
                  <button
                    value={item.id}
                    type="submit"
                    onClick={(event) => this.approveProduct(event)}
                  >
                    Approve
                  </button>
                  <button
                    value={item.id}
                    type="submit"
                    onClick={(event) => this.denyProduct(event)}
                  >
                    Deny
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
        <br />
        <hr />
        <br />
        <br />
      </div>
    );
  }
}

export default AdminChecker(Admin);
