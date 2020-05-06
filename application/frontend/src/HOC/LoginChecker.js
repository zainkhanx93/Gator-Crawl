import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => {
      console.log('GET_TOKEN_ACTION');
    }
  };
};

export default function (Component) {
  class LoginChecker extends React.Component {
    shouldComponentRender = () => {
      // const { loading } = this.props;
      // return !loading;
      return true;
    }

    render() {
      if (!this.shouldComponentRender()) {
        return <div />;
      }

      const cookie = new Cookies();
      const token = cookie.get('token');

      if (!token) {
        return (
          <div>
            <br />
            <h1>Oops, you do not have access to this.</h1>
            <Link to="/login">Try to login.</Link>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(LoginChecker);
}
