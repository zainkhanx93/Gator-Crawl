import React from 'react';

import MainNavBar from '../Components/Navigation/MainNavBar';
import ProfileNavBar from '../Components/Navigation/ProfileNavBar';
import gclogo from '../Assets/Images/nike.jpg';

import './Cart.css';

class Cart extends React.Component {
  render() {
    const { history } = this.props;

    const mycart = (
      <div>
        <p className="Title"> My Shopping Cart </p>
        <div className="Shopping-Cart-Window">

          <div className="Product-Window">

            <div className="Cart-Product">
              <img className="Profile-picture" src={gclogo} alt="Logo" />

              <div className="Cart-Product-Info">
                <p style={{ fontSize: '25px' }}> <b> Nike Shoes </b></p>
                <p> Size 9 Roshis </p>
                <p style={{ fontSize: '25px' }}><b> $ 200.00 </b> </p>
              </div>
              <div className="Cart-Buttons">
                <button className="Button" type="button"> Message  </button>
                <br />
                <br />
                <br />
                <button className="Button" onClick="Delete()" type="button"> Delete </button>
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

    return (
      <div>
        <MainNavBar history={history} />
        <div className="Cart-Window">
          <div className="Cart-Left-Side">
            <ProfileNavBar />
          </div>
          <div className="Cart-Right-Side">
            {mycart}
          </div>
        </div>
      </div>
    );
  }
}


export default Cart;

function Delete() {
  let product = document.getElementById('Cart-Product');
  product.removeChild(product.childNodes[0]);
}
