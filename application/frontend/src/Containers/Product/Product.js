import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import LoginChecker from '../HOC/LoginChecker';
import * as homeActions from '../../Store/Actions/homeActions';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import productpic from '../../Assets/Images/fff.png';
import './product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const qry = +location.search.substring(11);
    // const cookie = new Cookies();
    // const id = cookie.get('id');
    axios.get(`/api/products/id/${qry}`).then((res) => {
      // setProducts(res.data);
      // console.log(res.data);
      if (res) {
        // console.log(res.data);
        this.setState({ product: res.data[0] });
      }
    });
  }

  render() {
    const {
      // location,
      history
    } = this.props;
    const { product } = this.state;
    // const pid = location.search.substring(11);
    const cookie = new Cookies();

    let buttons = null;
    if (+cookie.get('id') === +product.sellerId) {
      buttons = (
        <div style={{ textAlign: 'center', color: 'brown' }}>
          <b>This is your product</b>
        </div>
      );
    } else {
      buttons = (
        <div style={{ margin: '30px' }}>
          <button className="Product-Button" type="button">Bookmark</button>
          <button className="Product-Button" type="button">Message Seller</button>
        </div>
      );
    }

    let postDate = null;
    if (product.createdAt) {
      postDate = product.createdAt.substring(0, 10);
    }

    return (
      <div>
        <MainNavBar history={history} />
        <Link to="/home">Back</Link>
        <br />
        <br />
        <div className="mainwindow">
          <div className="leftwindow">
            <img className="productpic" src={productpic} alt="productpic" />
          </div>
          <div className="rightwindow">

            <div className="rightbox">
              <p
                style={{
                  marginLeft: '30px',
                  fontSize: '30px',
                  fontWeight: 'bold'
                }}
              >
                {' '}
                {product.productName}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Date Posted: {postDate}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Seller Id: {product.sellerId}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Category: {product.categoryId}
              </p>
              <p
                style={{
                  marginLeft: '30px',
                  fontSize: '15px',
                  // fontWeight: 'bold'
                }}
              >
                Price: ${product.price}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Description: <br />
                {product.description}
              </p>
              {buttons}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.homeReducer.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Product));
