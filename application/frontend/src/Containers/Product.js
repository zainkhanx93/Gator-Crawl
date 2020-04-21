import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import productpic from '../Assets/Images/fff.png';
import * as homeActions from '../Store/Actions/homeActions';
import MainNavBar from '../Components/Navigation/MainNavBar';
import './Product.css';


class Product extends React.Component {
  componentDidMount() {
    const { setProducts, products, location } = this.props;
    // console.log(location.search.substring(11));
    // axios.get(`/api/products/${location.search.substring(11)}`).then((res) => {
    axios.get('/api/products/all').then((res) => {
      setProducts(res.data);
      // console.log(res.data);
    });
    console.table(products);
  }

  render() {
    const { location, history, products } = this.props;
    // console.log(location.search.substring(11));
    const pid = location.search.substring(11);
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
            {products.filter((product) => parseInt(product.id, 10) === parseInt(pid, 10))
              .map((product, index) => (
                <div className="rightbox" key={index}>
                  <p style={{marginLeft: '30px', fontSize: '30px', fontWeight: 'bold' }}> {product.productName}</p>
                  <p style={{marginLeft: '30px', fontSize: '15px' }}>Date Posted: {product.createdAt.substring(0, 10)}</p>
                  <p style={{marginLeft: '30px', fontSize: '15px' }}>Seller Id: {product.sellerId}</p>
                  <p style={{marginLeft: '30px', fontSize: '15px' }}>Condition: {product.condition}</p>
                  <br />
                  <p style={{marginLeft: '30px', fontSize: '15px' }}>Buy it now: </p>
                  <p style={{marginLeft: '30px', fontSize: '15px', fontWeight: 'bold' }}>${product.price}</p>
                  <div style={{margin: '30px'}}>
                    <button>Bookmark</button>
                    <button>Bid</button>
                    <button>Message Seller</button>
                  </div>
                  <p style={{marginLeft: '30px', fontSize: '15px' }}>Description: <br />{product.description}</p>

                </div>
              ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);
