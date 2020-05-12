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
      isModalShowing: false,
      selectedFile: null,
      photo: null,
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
        admin: cookie.get('admin'),
      };
      setCurrentUser(user);
    }
  }

  // Submit File to Backend imageUpload Function
  submitFile = async (event) => {
    event.preventDefault();
    const { selectedFile } = this.state;
    const formData = new FormData();
    formData.append('file', selectedFile[0]);
    axios.post('/imageUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      // handle your response;
      console.log(response.data);
    }).catch((error) => {
      // handle your error
      console.log(error);
    });
  };

  //  Creating a product with photo and formValues.
  onProductCreated = async () => {
    const { formValues, setProducts, currentUser } = this.props;
    const { selectedFile, photo } = this.state;
    const formData = new FormData();
    formData.append('file', selectedFile[0]);

    await axios.post('/imageUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      console.log(response);
      // handle your response;
      this.setState({
        photo: response.data.Location,
      });
    }).catch((error) => {
      // handle your error
      console.log(error);
    });

    console.log('this.state.photo => ', photo);
    axios.post('/api/products/', {
      ...formValues,
      sellerId: currentUser.id,
      approved: 0,
      photo,
    }).then((res) => {
      if (res) {
        this.setState({ isModalShowing: false });
        axios.get('/api/products/').then((response) => {
          setProducts(response.data);
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  // Goes to Product Page.
  productClicked = (product) => {
    const { history } = this.props;
    // console.table(product);
    history.push(`home/products?productid=${product.id}`);
  };

  // Opens Modal.
  createPostClicked = () => {
    this.setState({ isModalShowing: true });
  };

  // Closes Modal.
  hideModal = () => {
    this.setState({ isModalShowing: false });
  };

  // Sets Uploaded File to State.
  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files,
    });
  };

  // Handles Purchase of Item
  handlePurchase = (product) => {
    const { history } = this.props;
    const cookie = new Cookies();
    const buyerId = cookie.get('id');
    console.table(product);
    axios.post('/api/sales/', {
      buyerId,
      sellerId: product.sellerId,
      approved: 0,
      productId: product.id,
      price: product.price
    }).then((res) => {
      if (res) {
        console.log(res.data);
        history.push('/messages');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    const {
      products,
      history,
      currentUser,
      categories,
      filter,
      setFilter,
    } = this.props;
    const { isModalShowing } = this.state;
    const cookie = new Cookies();

    // Admin Panel
    let adminLink = null;
    if (cookie.get('admin') && cookie.get('admin') === 'true') {
      adminLink = <Link to="/admin">Admin Panel</Link>;
    }

    // Home page filters.
    const filters = (
      <div>
        <p>
          <b>Filters</b>
        </p>
        Categories:
        <select
          name="categories"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        >
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

    // Convrts categoryId to the string it represents.
    const numtocat = (cid) => {
      switch (cid) {
        case 1:
          return 'Clothing';
        case 2:
          return 'Electronics';
        case 3:
          return 'Collectables & Art';
        case 4:
          return 'Home & Garden';
        case 5:
          return 'Sporting Goods';
        case 6:
          return 'Toys & Hobbies';
        default:
          return 'Other';
      }
    };

    // Post display logic.
    let postings = (<div style={{ textAlign: 'center' }}>No postings available</div>);
    if (products.length !== 0) {
      // console.log(products);
      postings = (
        <div className="home-products">
          {products.map((product) => (
            <div key={product.id} className="product">
              <div
                id={product.id}
                key={product.id}
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
                  <p>Category: {numtocat(product.categoryId)}</p>
                  <p>Posted on: {product.createdAt.substring(0, 10)}</p>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="purchase-button"
                  onClick={() => this.handlePurchase(product)}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <Modal show={isModalShowing} modalClosed={this.hideModal}>
          <CreatePostForm
            categories={categories}
            handleSubmit={this.onProductCreated}
            fileSelectedHandler={this.fileSelectedHandler}
          />
          <br />
        </Modal>
        <MainNavBar history={history} />
        <div className="home-window">
          <div className="home-filters-upload">
            <p style={{ paddingLeft: '0px' }}>Hi {currentUser.firstName}!</p>
            <button type="button" className="create-button" onClick={this.createPostClicked}>
              <p style={{ fontSize: '15px' }}><b>Post</b></p>
            </button>
            {filters}
          </div>
          <div className="home-searchresults">
            <SearchBar history={history} className="navbar-searchbar" />
            <div className="home-title-sort">
              <h1>
                <b>Search Results</b>
              </h1>
            </div>
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
      categoryId: formSelector(state, 'categoryId'),
    },
    currentUser: state.loginReducer.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products)),
    setCategories: (categories) => dispatch(homeActions.setCategories(categories)),
    setFilter: (filter) => dispatch(homeActions.setFilter(filter)),
    setCurrentUser: (user) => dispatch(userActions.setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker(Home));
