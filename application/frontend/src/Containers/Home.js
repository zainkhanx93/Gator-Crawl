import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MainNavBar from '../Nav/MainNavBar';
import * as homeActions from '../Store/Actions/homeActions';
import './Home.css';
import placeholder from '../Images/placeholder.png';

class Home extends React.Component {
  componentDidMount() {
    // .substring(3)
    const { setProducts } = this.props;
    // console.log(location.search.substring(11));

    axios.get('/api/products/all').then((res) => {
      setProducts(res.data);
    });
  }

  productClicked = (product) => {
    const { history } = this.props;
    console.table(product);
    history.push(`home/products?productid=${product.id}`);
  }

  render() {
    const { products, history } = this.props;

    const filters = (
      <div>
        <p><b>Filters</b></p>
        Categories:
        <select name="categories" id="categories">
          <option value="All">All</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
        <br />
        Condition:
        <select name="conditon" id="condition">
          <option value="All">All</option>
          <option value="Brand New">Brand New</option>
          <option value="Good">Good</option>
          <option value="Used">Used</option>
          <option value="Poor">Poor</option>
        </select>
        <br />
        Price:
        <select name="price" id="price">
          <option value="All">All</option>
          <option value="$100 or more">$100 or more</option>
          <option value="$50-$100">$50-$100</option>
          <option value="$0-$50">$0-$50</option>
          <option value="Free">Free</option>
        </select>
      </div>
    );

    const titlesort = (
      <div className="home-title-sort">
        <p><b>Search Results</b></p>
        Sort by:
        <select name="sortby" id="sortby">
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Most Expensive">Most Expensive</option>
          <option value="Least Expensive">Least Expensive</option>
        </select>
      </div>
    );

    return (
      <div>
        <MainNavBar history={history} />
        {/*
        <select value={filter} onChange={(e) => { setFilter(e.target.value); }}>
          <option defaultValue value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        */}
        <div className="home-window">
          <div className="home-filters-upload">
            <button type="button">Create Posting</button>
            {filters}
          </div>
          <div className="home-searchresults">
            {titlesort}
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
                    <p>Date posted</p>
                  </div>
                </div>
              ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
