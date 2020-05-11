import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.token
  };
};

const mapDispatchToProps = () => {
  return {
    getToken: () => {
      console.log('GET_TOKEN_ACTION');
    }
  };
};

export default function (Component) {
  class AdminChecker extends React.Component {
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
      const admin = cookie.get('admin');
      // console.log(admin);

      if (admin === false || admin === 'false' || !admin) {
        return (
          <div style={{ textAlign: 'center' }}>
            <br />
            <h1>Oops, you do not have access to this page.</h1>
            <hr />
            <Link to="/login">Try to login.</Link>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AdminChecker);
}
