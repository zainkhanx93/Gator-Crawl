import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// import * as homeActions from '../Store/Actions/homeActions';
import MainNavBar from '../Nav/MainNavBar';

class Product extends React.Component {
  componentDidMount() {
    const { products, location } = this.props;
    console.log(location.search.substring(11));
    axios.get(`/api/products/${location.search.substring(11)}`).then((res) => {
      // setProducts(res.data);
      console.log(res.data);
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
        Product Page
        This is product {pid}
        {products.map((product, index) => (
          <div key={index}>
            <p>ID: {product.id} </p>
            <p>Product Name: {product.productName}</p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Posten on: {product.createdAt}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.homeReducer.products
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//
//   };
// };

export default connect(mapStateToProps)(Product);
