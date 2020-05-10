import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';

import MainNavBar from '../../Components/Navigation/MainNavBar';
import Modal from '../../Components/UI/Modal';
import CreatePostForm from '../../Components/Forms/CreatePostForm';
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
    const { setProducts, setCategories } = this.props;
    axios.get('/api/products/all').then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });

    axios.get('/api/categories').then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }

  onProductCreated = () => {
    const { formValues, setProducts, currentUser } = this.props;
    console.log(formValues);
    axios
      .post('/api/products/', { ...formValues, sellerId: currentUser.id })
      .then((res) => {
        console.log(res.data);
        this.setState({ isModalShowing: false });
        axios.get('/api/products/all').then((response) => {
          setProducts(response.data);
        });
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
        {/*
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
        */}
      </div>
    );

    const titlesort = (
      <div className="home-title-sort">
        <p><b>Search Results</b></p>
        {/*
        Sort by:
        <select name="sortby" id="sortby">
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Most Expensive">Most Expensive</option>
          <option value="Least Expensive">Least Expensive</option>
        </select>
        */}
      </div>
    );

    let postings = (
      <div style={{ textAlign: 'center' }}>No postings available</div>
    );

    if (products.length !== 0) {
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
        <Modal show={isModalShowing} modalClosed={this.hideModal}>
          <CreatePostForm handleSubmit={this.onProductCreated} />
          <br />
          <button type="button" onClick={this.hideModal}>
            exit
          </button>
        </Modal>
        <MainNavBar history={history} />
        <div className="home-window">
          <div className="home-filters-upload">
            <p>Hi {currentUser.firstName}!</p>
            <button type="button" onClick={this.createPostClicked}>
              Create Posting
            </button>
            {filters}
          </div>
          <div className="home-searchresults">
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
    currentUser: state.userReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products)),
    setCategories: (categories) => dispatch(homeActions.setCategories(categories)),
    setFilter: (filter) => dispatch(homeActions.setFilter(filter))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
