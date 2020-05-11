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
  componentDidMount() {
    const { setProducts } = this.props;
    // Fetches All Products From Backend
    const cookie = new Cookies();
    axios.get(`/api/products/${cookie.get('id')}/all`, {
      headers: {
        Authorization: `Bearer ${cookie.get('token')}`
      }
    }).then((res) => {
      setProducts(res.data);
    });
  }

  render() {
    const { history, products } = this.props;
    let myprods = <p>You have no items for sale.</p>;

    if (products.length !== 0) {
      console.table(products);
      myprods = (
        <div className="home-products">
          {products.map((product) => (
            <div id={product.id} key={product.id} className="product" onClick={() => this.productClicked(product)}>
              <img className="product-img" src={placeholder} alt={placeholder} />
              <div className="product-info">
                <strong>{product.productName}</strong>
                <br />
                <br />
                <strong>${product.price}</strong>
                <br />
                <p>{product.createdAt.substring(0, 10)}</p>
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
