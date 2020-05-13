import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import LoginChecker from '../HOC/LoginChecker';
import * as homeActions from '../../Store/Actions/homeActions';
import * as cartActions from '../../Store/Actions/cartActions';

import MainNavBar from '../../Components/Navigation/MainNavBar';
// import productpic from '../../Assets/Images/fff.png';
import './product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      seller: null,
      sellerId: null,
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
        this.setState({
          sellerId: res.data[0].sellerId,
        });
        axios.get(`/api/users/${res.data[0].sellerId}`).then((re) => {
          // console.log(re.data);
          this.setState({
            product: res.data[0],
            seller: re.data[0].email,
          });
        });
      }
    });
  }

  onSave = () => {
    const { addBookmark } = this.props;
    const { product, seller } = this.state;
    const bookmark = {
      ...product,
      // category: numtocat(product.categoryId),
      seller,
    };
    addBookmark(bookmark);
  };

  render() {
    const { history } = this.props;
    const { product, seller } = this.state;
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
          <button
            className="Product-Button"
            type="button"
            onClick={this.onSave}
          >
            Bookmark
          </button>
          <button
            className="Product-Button"
            type="button"
            onClick={() => history.push('/messages')}
          >
            Message Seller
          </button>
        </div>
      );
    }

    let postDate = null;
    if (product.createdAt) {
      postDate = product.createdAt.substring(0, 10);
    }

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

    return (
      <div>
        <MainNavBar history={history} />
        <Link to="/home">
          <p style={{ color: '#662A82', fontSize: '20px', textAlign: 'center' }}>Back To Home</p>
        </Link>
        <div className="mainwindow">
          <div className="leftwindow">
            <img className="productpic" src={product.photo} alt="productpic" />
          </div>
          <div className="rightwindow">
            <div className="rightbox">
              <p
                style={{
                  marginLeft: '30px',
                  fontSize: '30px',
                  fontWeight: 'bold',
                }}
              >
                {' '}
                {product.productName}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Description: {product.description}
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Category: {numtocat(product.categoryId)}
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
              <p
                style={{
                  marginLeft: '30px',
                  fontSize: '15px',
                  // fontWeight: 'bold'
                }}
              >
                Sold By:
                <Link
                  to={`/user/${this.state.sellerId}`}
                  style={{ fontSize: '15px' }}
                >
                  {seller}
                </Link>
              </p>
              <p style={{ marginLeft: '30px', fontSize: '15px' }}>
                Date Posted: {postDate}
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
    products: state.homeReducer.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products)),
    addBookmark: (bookmark) => dispatch(cartActions.addBookmark(bookmark)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginChecker(Product));
