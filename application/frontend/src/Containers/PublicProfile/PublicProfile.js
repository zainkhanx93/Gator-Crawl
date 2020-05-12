import React from 'react';
import axios from 'axios';
import MainNavBar from '../../Components/Navigation/MainNavBar.js';
import gclogo from '../../Assets/Images/gclogo.png';
import './PublicProfile.css';

class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        major: '',
      },
      forSale: [],
      sold: 0,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const { id } = this.props.match.params;
    axios.get(`/api/users/${id}`).then((res) => {
      if (res.length !== 0) {
        this.setState({
          user: res.data[0],
        });
      } else {
        history.push('/404');
      }
    });

    axios.get(`/api/sales/${id}`).then((res) => {
      this.setState({
        sold: res.data.length,
      });
    });

    axios.get(`/api/products/${id}/all/public`).then((res) => {
      this.setState({
        forSale: res.data,
      });
    });
  }

  productClicked = (product) => {
    const { history } = this.props;
    history.push(`/home/products?productid=${product.id}`);
  };

  render() {
    const { history } = this.props;
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

    let postings = (
      <div style={{ textAlign: 'center' }}>No postings available</div>
    );
    if (this.state.forSale.length !== 0) {
      // console.log(products);
      postings = (
        <div className="home-products">
          {this.state.forSale.map((product) => (
            <div
              id={product.id}
              key={product.id}
              className="product"
              onClick={() => this.productClicked(product)}
            >
              <img
                className="product-img"
                src={product.photo}
                alt={product.name}
              />
              <div className="product-info">
                <strong style={{}}>{product.productName}</strong>
                <p style={{}}>Price: ${product.price}</p>
                <p>Category: {numtocat(product.categoryId)}</p>
                <p>Posted on: {product.createdAt.substring(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    const me = (
      <div>
        <div className="User-Box">
          <div className="Profile-Picture-Window">
            <img className="Profile-picture" src={gclogo} alt="Logo" />
          </div>
          <div className="User-Info">
            <p>
              Name: {this.state.user.firstName} {this.state.user.lastName}
            </p>
            <p>Email: {this.state.user.email}</p>
            <p>Major: {this.state.user.major}</p>
            <p>Items Sold: {this.state.sold}</p>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <MainNavBar history={history} />
        <div className="userwindowinfo">{me}</div>
        <div className="forSale">
          <h2 className="title">Items for sale</h2>
          {postings}
        </div>
      </div>
    );
  }
}

export default PublicProfile;
