import React from 'react';
import { connect } from 'react-redux';

import LoginChecker from '../HOC/LoginChecker';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import ProfileNavBar from '../../Components/Navigation/ProfileNavBar';
import placeholder from '../../Assets/Images/placeholder.png';

import './MyProducts.css';

class MyProducts extends React.Component {
  render() {
    const { history, products, currentUser } = this.props;

    let myprods = <p>You have no items for sale.</p>;

    if (products.length !== 0) {
      console.table(products);
      myprods = (
        <div className="home-products">
          {products.filter((product) => {
            // console.log(product.sellerId);
            // console.log(currentUser.id);
            return parseInt(product.sellerId, 10) === parseInt(currentUser.id, 10);
          }).map((product) => (
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
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps)(LoginChecker(MyProducts));
