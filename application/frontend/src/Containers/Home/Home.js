import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';

import LoginChecker from '../HOC/LoginChecker';
import SearchBar from '../../Components/Search/SearchBar';
import MainNavBar from '../../Components/Navigation/MainNavBar';
import Modal from '../../Components/UI/Modal';
import CreatePostForm from '../../Components/Forms/CreatePostForm';

import * as userActions from '../../Store/Actions/userActions';
import * as homeActions from '../../Store/Actions/homeActions';
import placeholder from '../../Assets/Images/placeholder.png';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false
    };
  }

  componentDidMount() {
    const { setProducts, setCategories, setCurrentUser } = this.props;
    // Fetches All Products From Backend
    axios.get('/api/products/').then((res) => {
      setProducts(res.data);
    });
    // Fetches All Categories From Backend
    axios.get('/api/categories').then((res) => {
      // console.log(res.data);
      setCategories(res.data);
    });
    // Fetches User From Cookies
    const cookie = new Cookies();
    const token = cookie.get('token');
    if (token) {
      const user = {
        id: cookie.get('id'),
        firstName: cookie.get('firstName'),
        admin: cookie.get('admin')
      };
      setCurrentUser(user);
    }
  }

  onProductCreated = () => {
    const { formValues, setProducts, currentUser } = this.props;
    // console.log(formValues);
    axios
      .post('/api/products/',
        {
          ...formValues,
          sellerId: currentUser.id,
          approved: 0,
          photo: 'https://csc648-team01.s3.us-east-2.amazonaws.com/open_sign.jpg'
        }).then((res) => {
        // console.log(res.data);
        if (res) {
          this.setState({ isModalShowing: false });
          axios.get('/api/products/all').then((response) => {
            setProducts(response.data);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  productClicked = (product) => {
    const { history } = this.props;
    console.table(product);
    history.push(`home/products?productid=${product.id}`);
  };

  createPostClicked = () => {
    this.setState({ isModalShowing: true });
  };

  hideModal = () => {
    this.setState({ isModalShowing: false });
  };

  render() {
    const {
      products,
      history,
      currentUser,
      categories,
      filter,
      setFilter
    } = this.props;
    const { isModalShowing } = this.state;
    const cookie = new Cookies();

    let adminLink = null;
    if (cookie.get('admin') && cookie.get('admin') === 'true') {
      adminLink = <Link to="/admin">Admin Panel</Link>;
    }

    const filters = (
      <div>
        <p>
          <b>Filters</b>
        </p>
        Categories:
        <select name="categories" value={filter} onChange={(e) => { setFilter(e.target.value); }}>
          <option defaultValue value="">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        {adminLink}
      </div>
    );

    const titlesort = (
      <div className="home-title-sort">
        <h1><b>Search Results</b></h1>
      </div>
    );

    let postings = (
      <div style={{ textAlign: 'center' }}>No postings available</div>
    );

    if (products.length !== 0) {
      // console.log(products);
      postings = (
        <div className="home-products">
          {products.map((product) => (
            <div
              id={product.id}
              key={product.id}
              className="product"
              onClick={() => this.productClicked(product)}
            >
              <img
                className="product-img"
                src={product.photo}
                alt={placeholder}
              />
              <div className="product-info">
                <strong style={{}}>{product.productName}</strong>
                <p style={{}}>Price: ${product.price}</p>
                <p>CategoryId: {product.categoryId}</p>
                <p>SellerId: {product.sellerId}</p>
                <p>Posted on: {product.createdAt.substring(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <Modal show={isModalShowing} modalClosed={this.hideModal}>
          <CreatePostForm categories={categories} handleSubmit={this.onProductCreated} />
          <br />
        </Modal>
        <MainNavBar history={history} />

        <div className="home-window">
          <div className="home-filters-upload">
            <p style={{ paddingLeft: '0px' }}>Hi {currentUser.firstName}!</p>
            <button type="button" className="create-button" onClick={this.createPostClicked}>
              <p><b>Post</b></p>
            </button>
            {filters}
          </div>
          <div className="home-searchresults">
            <SearchBar history={history} className="navbar-searchbar" />
            {titlesort}
            {postings}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('createPostForm');
  return {
    products: state.homeReducer.products,
    categories: state.homeReducer.categories,
    filter: state.homeReducer.filter,
    formValues: {
      productName: formSelector(state, 'productName'),
      description: formSelector(state, 'description'),
      price: formSelector(state, 'price'),
      categoryId: formSelector(state, 'categoryId')
    },
    currentUser: state.loginReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products)),
    setCategories: (categories) => dispatch(homeActions.setCategories(categories)),
    setFilter: (filter) => dispatch(homeActions.setFilter(filter)),
    setCurrentUser: (user) => dispatch(userActions.setCurrentUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Home));
