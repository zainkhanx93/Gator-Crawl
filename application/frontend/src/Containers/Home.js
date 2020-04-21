import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import MainNavBar from '../Components/Navigation/MainNavBar';
import Modal from '../Components/UI/Modal';
import CreatePostForm from '../Components/Forms/CreatePostForm';
import * as homeActions from '../Store/Actions/homeActions';
import './Home.css';
import placeholder from '../Assets/Images/placeholder.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalShowing: false
    };
  }

  componentDidMount() {
    // .substring(3)
    const { setProducts } = this.props;
    // console.log(location.search.substring(11));

    axios.get('/api/products/all').then((res) => {
      setProducts(res.data);
    });
  }

  onProductCreated = () => {
    const { formValues, setProducts, currentUser } = this.props;
    console.log(formValues);
    axios.post('/api/products/', { ...formValues, sellerId: currentUser.id })
      .then((res) => {
        console.log(res.data);
        this.setState({ isModalShowing: false });
        axios.get('/api/products/all').then((response) => {
          setProducts(response.data);
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  productClicked = (product) => {
    const { history } = this.props;
    console.table(product);
    history.push(`home/products?productid=${product.id}`);
  }

  createPostClicked = () => {
    // console.log('button clicked');
    this.setState({ isModalShowing: true });
  }

  hideModal = () => {
    this.setState({ isModalShowing: false });
  }

  render() {
    const { products, history, currentUser } = this.props;
    const { isModalShowing } = this.state;

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

    let postings = <div style={{ textAlign: 'center' }}>No postings available</div>;

    if (products.length !== 0) {
      postings = (
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
          <button type="button" onClick={this.hideModal}>exit</button>
        </Modal>
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
            <p>Hi {currentUser.firstName}!</p>
            <button type="button" onClick={this.createPostClicked}>Create Posting</button>
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
    formValues: {
      productName: formSelector(state, 'productName'),
      description: formSelector(state, 'description'),
      price: formSelector(state, 'price'),
    },
    currentUser: state.userReducer.currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
