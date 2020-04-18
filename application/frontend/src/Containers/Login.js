import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';

import LoginForm from '../Forms/LoginForm';
import * as loginActions from '../Store/Actions/loginActions';

import gclogo from '../Images/gclogo.png';
import logotitle from '../Images/logotitle.png';
import './LoginRegister.css';

class Login extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    // console.log('onsubmit');
    const { handleSubmit, formValues, history } = this.props;
    handleSubmit({
      ...formValues
    });
    history.push('/home');
  };

  render() {
    const { isAuth } = this.props;

    let failed = null;
    if (isAuth === false) {
      failed = <p>Login failed, try again</p>;
    }

    // const failed = !isAuth ? <p>Login failed, try again</p> : <p />;

    return (
      <div className="Login-Box">
        <img className="Logo-Title" src={logotitle} alt="Gator Crawl" />
        <br />
        <img className="Logo" src={gclogo} alt="Logo" />
        <br />
        <h1 style={{ margin: 0 }}>Login</h1>
        <br />
        <LoginForm handleSubmit={this.onSubmit} />
        <br />
        {failed}
        <a className="Link" href="register"><b>Create new account</b></a>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('existingUserForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
    },
    isAuth: state.loginReducer.token
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { history } = props;
  return {
    handleSubmit: (values) => dispatch(loginActions.tryLogin(values, (isSuccess, token) => {
      if (isSuccess) {
        const cookie = new Cookies();
        cookie.set('token', token);
        history.push('/searchresults');
      }
    }))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
