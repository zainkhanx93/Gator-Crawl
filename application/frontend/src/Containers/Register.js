import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import RegisterForm from '../Components/Forms/RegisterForm';
import * as registerActions from '../Store/Actions/registerActions';

import logotitle from '../Assets/Images/logotitle.png';
import gclogo from '../Assets/Images/gclogo.png';
import './LoginRegister.css';

class Register extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    const { handleSubmit, formValues, history } = this.props;
    console.log(formValues);
    axios.post('/api/users', { email: formValues.email, password: formValues.password })
      .then((res) => {
        // console.log('got the response');
        console.log(res.data);
      }).catch((error) => {
        // console.log('whoops error');
        console.log(error);
      });

    handleSubmit({
      ...formValues
    });

    history.push('/login');
  };

  render() {
    return (
      <div className="Login-Box">
        <img className="Logo-Title" src={logotitle} alt="Gator Crawl" />
        <br />
        <img className="Logo" src={gclogo} alt="Logo" />
        <h1 style={{ margin: 0 }}>Register</h1>
        <br />
        <RegisterForm handleSubmit={this.onSubmit} />
        <br />
        <a href="login"><b>Already have an account? Click here to log in.</b></a>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const formSelector = formValueSelector('registerForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
      major: formSelector(state, 'major'),
      firstName: formSelector(state, 'firstName'),
      lastName: formSelector(state, 'lastName')
    }
    // initialValues: state.auth.initialValues
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (values) => dispatch(registerActions.tryRegister(values))
    // handleSubmit: (values) => dispatch(console.log(values))
    // loadAlbums: () => dispatch(homeActions.loadAlbums()),
    // setAlbumTitle: (albumTitle) => dispatch(homeActions.setAlbumTitle(albumTitle))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
