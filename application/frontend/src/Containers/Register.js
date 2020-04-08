import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';

import RegisterForm from '../Forms/RegisterForm';
import * as registerActions from '../Store/Actions/registerActions';


import gclogo from '../Images/gclogo.png';
import './LoginRegister.css';

class Register extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    const { handleSubmit, formValues } = this.props;
    // console.log(formValues);
    handleSubmit({
      ...formValues
    });
  };

  render() {
    return (
      <div className="Login-Box">
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
  const formSelector = formValueSelector('newUserForm');
  return {
    formValues: {
      email: formSelector(state, 'email'),
      password: formSelector(state, 'password'),
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
