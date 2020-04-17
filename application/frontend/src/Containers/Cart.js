import React from 'react';

import MainNavBar from '../Nav/MainNavBar';

import gclogo from '../Images/nike.jpg';

import './Cart.css';

class Cart extends React.Component {
  render() {
    return (
      <div>
        <MainNavBar />
        <p className="Title"> My Shopping Cart </p>
        <div className="Shopping-Cart-Window">

          <div className="Product-Window">

            <div className="Cart-Product">
              <img className="Profile-picture" src={gclogo} alt="Logo" />
              <div className="Cart-Product-Info">
                <p style={{ fontSize: '25px' }}> <b> Nike Shoes </b></p>
                <br />
                <p> Size 9 Roshis </p>
                <br />
              </div>
              <div className="Cart-Buttons">
                <p style={{ fontSize: '25px' }}><b> $ 200.00 </b> </p>
                <button className="Button" type="button"> Message Seller </button>
                <button className="Button" type="button"> Remove </button>
              </div>
            </div>
          </div>

          <div className="Total-Box">
            <div className="Total-Cart-Info-Left">
              <p style={{ fontSize: '30px', color: '#662A82' }}><b> Summary </b> </p>
              <br />
              <p style={{ fontSize: '25px' }}> <b> Total </b></p>
              <br />
            </div>
            <div className="Total-Cart-Info-Right">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <p style={{ fontSize: '25px' }}> <b> $200 </b></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
