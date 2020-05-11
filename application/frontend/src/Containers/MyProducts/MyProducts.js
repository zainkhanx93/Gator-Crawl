import React from 'react';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import LoginChecker from '../HOC/LoginChecker';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import placeholder from '../../Assets/Images/placeholder.png';
import * as homeActions from '../../Store/Actions/homeActions';
import './MyProducts.css';

class MyProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    // const { setProducts } = this.props;
    // Fetches All Products From Backend
    const cookie = new Cookies();
    axios.get(`/api/products/${cookie.get('id')}/all`, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`
      }
    }).then((res) => {
      console.log(res.data);
      this.setState({ products: res.data });
    });
  }

  delete = (event) => {
    const { products } = this.state;
    event.persist();
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
    const { history } = this.props;
    const { products } = this.state;
    let myprods = <p>You have no items for sale.</p>;

    const numtocat = (cid) => {
      switch (cid) {
        case 1: return 'Clothing';
        case 2: return 'Electronics';
        case 3: return 'Collectables & Art';
        case 4: return 'Home & Garden';
        case 5: return 'Sporting Goods';
        case 6: return 'Toys & Hobbies';
        default: return 'Other';
      }
    };

    const getapproval = (approved) => {
      if (approved) return 'Active';
      return 'Pending Approval';
    };

    if (products.length !== 0) {
      // console.table(products);
      myprods = (
        <div className="home-products">
          {products.map((product) => (
            <div id={product.id} key={product.id} className="product">
              <img className="product-img" src={product.photo} alt={placeholder} />
              <div className="product-info">
                <strong>{product.productName}</strong>
                <br />
                <br />
                <strong>${product.price}</strong>
                <br />
                <p>Category: {numtocat(product.categoryId)}</p>
                <p>Description: {product.description}</p>
                <p>Status: {getapproval(product.approved)}</p>
                <button value={product.id} type="submit" onClick={(event) => this.delete(event)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <MainNavBar history={history} />
        <div className="myproducts-window">
          <div className="myproducts-left">
            <ProfileNavBar />
          </div>
          <div className="myproducts-right">
            <p className="Title">My Products </p>
            {myprods}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.homeReducer.products,
    currentUser: state.loginReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(MyProducts));
