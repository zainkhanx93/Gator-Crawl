import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as homeActions from '../../Store/Actions/homeActions';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  render() {
    const { filter } = this.props;
    const { query } = this.state;

    const { setProducts } = this.props;

    const handleSearch = () => {
      const { history } = this.props;
      if (query) {
        if (filter) {
          axios.get(`/api/products/${query}/${filter}`).then((res) => {
            setProducts(res.data);
          });
          history.push('/home');
        } else {
          axios.get(`/api/products/${query}`).then((res) => {
            setProducts(res.data);
          });
          history.push('/home');
        }
      } else if (filter) {
        axios.get(`/api/products/all/${filter}`).then((res) => {
          setProducts(res.data);
        });
        history.push('/home');
      } else {
        axios.get('/api/products/all').then((res) => {
          setProducts(res.data);
          history.push('/home');
        });
      }
    };

    const setQuery = (value) => {
      this.setState({ query: value });
    };

    return (
      <div className="searchbar">
        <input className="input-field" type="search" placeholder="Seach Gator Crawl" onChange={(e) => setQuery(e.target.value)} />
        <button type="submit" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.homeReducer.products,
    filter: state.homeReducer.filter
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => dispatch(homeActions.setProducts(products))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
