import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';

class LoginForm extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    handleSubmit();
  }

  renderInputField = ({
    input,
    label,
    type,
    meta
  }) => {
    return (
      <div className="field">
        <input
          {...input}
          className="Input-Field"
          type={type}
          autoComplete="off"
          placeholder={label}
        />
        {this.renderError(meta)}
      </div>
    );
  }

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="errormessage">
          {error}
        </div>
      );
    }
    return (<div />);
  };

  render() {
    const {
      // error,
      // handleSubmit,
      pristine,
      // reset,
      submitting,
      invalid
    } = this.props;

    return (
      <form autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
        <Field name="email" type="email" component={this.renderInputField} label="Email" />
        <br />
        <Field name="password" type="password" component={this.renderInputField} label="Password" />
        <br />
        <a onClick={() => alert('Sending email to reset password')} href="login" className="Link">Forgot password?</a>
        {/* error && <strong>{error}</strong> */}
        <button
          className="Login-Button"
          type="submit"
          disabled={pristine || submitting || invalid}
        >
          <b>Login</b>
        </button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.email) {
    errors.email = 'You must enter an email';
  } else if (formValues.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = 'Not a valid email';
  } else if (formValues.email && !/^[A-Z0-9._%+-]+@mail.sfsu.edu$/i.test(formValues.email)) {
    errors.email = 'Must be an SFSU email ending in @mail.sfsu.edu';
  }

  if (!formValues.password) {
    errors.password = 'You must enter a password';
  }
  return errors;
};

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm);
