import React from 'react';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import RegisterForm from '../../Components/Forms/RegisterForm';
import logotitle from '../../Assets/Images/logotitle.png';
import gclogo from '../../Assets/Images/gclogo.png';
import './LoginRegister.css';

class Register extends React.Component {
  componentDidMount() {
    const cookie = new Cookies();
    cookie.remove('token');
  }

  onSubmit = () => {
    const {
      formValues,
      history
    } = this.props;
    // Sends a register request.
    axios.post('/api/users', { ...formValues, admin: 0 })
      .then(() => {
        console.log('REGISTER SUCCESS');
        history.push('/login');
      }).catch((error) => {
        console.log('EMAIL ALREADY TAKEN');
        console.log(error);
      });
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
  };
};

export default connect(mapStateToProps)(Register);
